import argparse
from pathlib import Path
from PIL import Image


def convert_pngs_to_webp(input_dir: Path, output_dir: Path, quality: int):
    output_dir.mkdir(parents=True, exist_ok=True)

    for png_path in input_dir.glob("*.png"):
        webp_path = output_dir / (png_path.stem + ".webp")

        with Image.open(png_path) as img:

            img.save(
                webp_path,
                "WEBP",
                quality=quality,
                method=6  
            )

        print(f"Converted: {png_path.name} -> {webp_path.name}")


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description="Convert PNG files to WebP.")
    parser.add_argument("input", help="Input folder containing PNG files")
    parser.add_argument(
        "-o", "--output",
        required=True,
        help="Output folder for WebP files"
    )
    parser.add_argument(
        "-q", "--quality",
        type=int,
        default=80,
        help="WebP quality (default: 80)"
    )

    args = parser.parse_args()

    input_dir = Path(args.input)
    output_dir = Path(args.output)

    if not input_dir.is_dir():
        raise ValueError(f"Input path is not a directory: {input_dir}")

    convert_pngs_to_webp(input_dir, output_dir, args.quality)
