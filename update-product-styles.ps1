# Update product card styling to match car-care.html

$newStyles = @"
	<style>
		.category-intro {
			padding: 120px 5vw 80px;
			max-width: 1400px;
			margin: 0 auto;
		}
		.category-intro h1 {
			font-family: "Heading";
			font-size: 4rem;
			color: var(--color);
			margin-bottom: 20px;
			letter-spacing: -1px;
		}
		.category-intro p {
			font-family: "base";
			font-size: 1.2rem;
			line-height: 1.8;
			color: #666;
			max-width: 900px;
		}

		/* Products Showcase Section */
		.products-showcase {
			padding: 8rem 5vw;
			background: linear-gradient(to bottom, #fff 0%, #f8f8f8 100%);
		}

		.products-showcase h2 {
			font-family: "Heading", sans-serif;
			font-size: 4rem;
			font-weight: 800;
			text-align: center;
			margin-bottom: 1rem;
			color: var(--color);
		}

		.section-subtitle {
			font-family: "base", sans-serif;
			text-align: center;
			font-size: 1.2rem;
			color: #666;
			margin-bottom: 5rem;
			font-weight: 300;
		}

		.products-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 3rem;
			max-width: 1400px;
			margin: 0 auto;
		}

		.product-card {
			background: #fff;
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
			cursor: pointer;
			position: relative;
			transition: box-shadow 0.3s ease;
		}

		.product-image-wrapper {
			position: relative;
			width: 100%;
			height: 320px;
			overflow: hidden;
			background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
		}

		.product-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			filter: grayscale(0%);
		}

		.product-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(135deg, rgba(220, 20, 60, 0.9) 0%, rgba(139, 0, 0, 0.9) 100%);
			opacity: 0;
			pointer-events: none;
			mix-blend-mode: multiply;
		}

		.product-info {
			padding: 2rem;
			position: relative;
			background: #fff;
		}

		.product-name {
			font-family: "Heading", sans-serif;
			font-size: 1.5rem;
			font-weight: 700;
			margin-bottom: 0.5rem;
			color: #222;
		}

		.product-category {
			font-family: "base", sans-serif;
			font-size: 0.95rem;
			color: #888;
			text-transform: uppercase;
			letter-spacing: 1px;
			font-weight: 400;
		}

		@media (max-width: 768px) {
			.products-showcase {
				padding: 5rem 5vw;
			}

			.products-showcase h2 {
				font-size: 2.5rem;
			}

			.products-grid {
				grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
				gap: 2rem;
			}

			.product-image-wrapper {
				height: 250px;
			}

			.product-info {
				padding: 1.5rem;
			}

			.product-name {
				font-size: 1.2rem;
			}
		}
	</style>
"@

$files = @(
    "cleaner-degreasers.html",
    "rust-remover.html",
    "insulating-coatings.html",
    "lubricants.html",
    "injection-molding.html",
    "bulk-consumables-industrial.html",
    "two-wheeler.html",
    "four-wheeler.html",
    "additives.html",
    "spray-paint.html",
    "bulk-consumables-car.html",
    "home-care.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Replace the style section
        $content = $content -replace '(?s)<style>.*?</style>', $newStyles
        
        # Replace old class names in HTML
        $content = $content -replace '<section class="products">', '<section class="products-showcase">'
        $content = $content -replace '<div class="product-list">', '<div class="products-grid">'
        $content = $content -replace '<div class="product"', '<div class="product-card"'
        $content = $content -replace '<div class="content">', '<div class="product-info">'
        $content = $content -replace '<h3>', '<h3 class="product-name">'
        $content = $content -replace '<p>', '<p class="product-category">'
        $content = $content -replace '</div>\s*</div>\s*</section>', '</div></section>'
        
        # Update product image wrapper to use img tags instead of SVG
        $content = $content -replace '(?s)<div class="product-image-wrapper">.*?</div>\s*<div class="product-info">', '<div class="product-image-wrapper"><img src="./assets/logo.png" alt="Product" class="product-img"><div class="product-overlay"></div></div><div class="product-info">'
        
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        
        Write-Host "Updated $file"
    }
}

Write-Host ""
Write-Host "All product card styles updated successfully!"
