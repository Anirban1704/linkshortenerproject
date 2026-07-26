#!/usr/bin/env python3
import argparse
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

try:
    import psycopg
except ImportError as exc:  # pragma: no cover - handled at runtime
    raise SystemExit(
        "psycopg is required. Install it with: pip install psycopg[binary]"
    ) from exc


def load_database_url(env_path: Path) -> str:
    if not env_path.exists():
        raise FileNotFoundError(f"Could not find .env at {env_path}")

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        if key.strip() == "DATABASE_URL":
            return value.strip().strip('"').strip("'")

    raise ValueError("DATABASE_URL was not found in the .env file")


def month_labels_for_last_year() -> List[Tuple[int, int]]:
    now = datetime.now()
    year = now.year
    month = now.month
    months: List[Tuple[int, int]] = []

    for _ in range(12):
        months.append((year, month))
        month -= 1
        if month == 0:
            month = 12
            year -= 1

    return list(reversed(months))


def query_monthly_counts(database_url: str) -> Dict[Tuple[int, int], int]:
    with psycopg.connect(database_url) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT DATE_TRUNC('month', created_at) AS month_bucket, COUNT(*) AS link_count
                FROM short_links
                WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
                GROUP BY 1
                ORDER BY 1
                """
            )
            rows = cur.fetchall()

    totals: Dict[Tuple[int, int], int] = {}
    for row in rows:
        bucket = row[0]
        if bucket is None:
            continue
        totals[(bucket.year, bucket.month)] = int(row[1])

    return totals


def build_chart(month_counts: Dict[Tuple[int, int], int], output_path: Path) -> None:
    labels = []
    values = []

    for year, month in month_labels_for_last_year():
        labels.append(f"{year:04d}-{month:02d}")
        values.append(month_counts.get((year, month), 0))

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.bar(labels, values, color="#2563eb")
    ax.set_title("Links created per month (last 12 months)")
    ax.set_xlabel("Month")
    ax.set_ylabel("Total links created")
    ax.set_ylim(bottom=0)
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()

    output_path.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output_path, dpi=200)
    plt.close(fig)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a monthly bar chart of link creation activity")
    parser.add_argument(
        "--output",
        default="link_creation_trends.png",
        help="Path to write the PNG chart to (default: link_creation_trends.png)",
    )
    parser.add_argument(
        "--env-file",
        default=None,
        help="Path to the .env file. Defaults to the repository root .env.",
    )
    return parser.parse_args()


def find_repo_root(start_path: Path) -> Path:
    for candidate in [start_path, *start_path.parents]:
        if (candidate / ".env").exists() and (candidate / "package.json").exists():
            return candidate
    raise FileNotFoundError("Could not find the repository root containing .env and package.json")


def main() -> None:
    args = parse_args()
    repo_root = find_repo_root(Path(__file__).resolve())
    env_path = Path(args.env_file).resolve() if args.env_file else repo_root / ".env"

    database_url = load_database_url(env_path)
    month_counts = query_monthly_counts(database_url)

    output_path = Path(args.output)
    if not output_path.is_absolute():
        output_path = (Path.cwd() / output_path).resolve()

    build_chart(month_counts, output_path)
    print(output_path)


if __name__ == "__main__":
    main()
