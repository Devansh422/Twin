# PowerShell script to generate car care product subcategory pages

# Define page data
$pages = @(
    @{
        filename = "two-wheeler.html"
        title = "Two Wheeler Care Products"
        intro = "Our specialized two-wheeler care products are formulated specifically for motorcycles, scooters, and bikes. From engine cleaners to chain lubricants, each product is designed to enhance performance, protect components, and maintain the aesthetic appeal of your two-wheeler. Whether you're a daily commuter or a weekend rider, our range ensures your vehicle stays in peak condition with minimal maintenance effort."
        sectionTitle = "Two Wheeler Care Solutions"
        products = @(
            @{name="Motorcycle Chain Cleaner"; desc="Powerful formula that removes dirt, grease, and old lubricant from motorcycle chains."},
            @{name="Chain Lube Spray"; desc="Long-lasting lubricant that reduces wear and extends chain life in all conditions."},
            @{name="Bike Polish & Shine"; desc="Premium polish that enhances paint gloss and provides UV protection for fairings."},
            @{name="Engine Degreaser"; desc="Heavy-duty cleaner for removing oil and grime from motorcycle engines."},
            @{name="Brake Dust Remover"; desc="Safe formula for cleaning brake components without leaving harmful residues."},
            @{name="Helmet Visor Cleaner"; desc="Anti-fog cleaner that provides crystal clear visibility and scratch-free cleaning."},
            @{name="Chrome Polish"; desc="Brings brilliant shine to chrome parts while protecting against rust and tarnish."},
            @{name="Silencer Heat Resistant Paint"; desc="High-temperature paint for restoring and protecting exhaust systems."}
        )
    },
    @{
        filename = "four-wheeler.html"
        title = "Four Wheeler Care Products"
        intro = "Our comprehensive four-wheeler care range provides everything needed to maintain cars, SUVs, and commercial vehicles. From exterior detailing to engine maintenance, each product is engineered to deliver professional results. Our formulations are safe for modern vehicle finishes and components, ensuring your investment stays protected while looking its best. Perfect for car enthusiasts and professional detailers alike."
        sectionTitle = "Four Wheeler Care Solutions"
        products = @(
            @{name="Car Wash Shampoo"; desc="pH-balanced formula that safely removes dirt while maintaining wax protection."},
            @{name="Ceramic Coating Spray"; desc="Advanced protection that creates a hydrophobic layer and enhances gloss."},
            @{name="Tire Shine & Protectant"; desc="Long-lasting formula that restores deep black color to tires and protects from cracking."},
            @{name="Interior Dashboard Polish"; desc="UV-resistant polish that revitalizes dashboards and prevents fading."},
            @{name="Glass Cleaner Anti-Fog"; desc="Streak-free cleaner with anti-fog properties for clear visibility."},
            @{name="Leather Conditioner"; desc="Nourishes and protects leather seats, preventing cracking and aging."},
            @{name="Engine Bay Cleaner"; desc="Safe degreaser for cleaning engine compartments without harming components."},
            @{name="Scratch Remover Compound"; desc="Professional-grade compound that removes minor scratches and swirl marks."}
        )
    },
    @{
        filename = "additives.html"
        title = "Automotive Additives"
        intro = "Our premium automotive additives are scientifically formulated to enhance vehicle performance, fuel efficiency, and engine longevity. From fuel system cleaners to oil additives, each product targets specific performance areas to optimize your vehicle's operation. These advanced formulations work with modern engines and fuel systems, providing measurable improvements in power, efficiency, and reliability."
        sectionTitle = "Performance Additives"
        products = @(
            @{name="Fuel Injector Cleaner"; desc="Removes deposits from fuel injectors, restoring optimal spray patterns and efficiency."},
            @{name="Octane Booster"; desc="Increases fuel octane rating to prevent knocking and improve performance."},
            @{name="Engine Oil Additive"; desc="Reduces friction and wear while extending oil life and engine protection."},
            @{name="Diesel Fuel Treatment"; desc="Prevents fuel gelling, cleans injectors, and improves cetane rating."},
            @{name="Cooling System Flush"; desc="Removes rust and scale buildup from cooling systems for optimal heat transfer."},
            @{name="Transmission Treatment"; desc="Reduces friction and heat in automatic transmissions for smoother shifting."},
            @{name="DPF Cleaner"; desc="Regenerates diesel particulate filters and restores exhaust flow."},
            @{name="Anti-Gel Diesel Additive"; desc="Prevents diesel fuel from gelling in cold weather conditions."}
        )
    },
    @{
        filename = "spray-paint.html"
        title = "Automotive Spray Paint"
        intro = "Our professional-grade automotive spray paints deliver showroom-quality finishes for touch-ups, restorations, and custom projects. Available in a wide range of colors and finishes, each formula is designed for easy application and excellent adhesion to automotive surfaces. Whether you're repairing minor damage or customizing your vehicle, our spray paints provide durable, weather-resistant coverage that matches OEM standards."
        sectionTitle = "Spray Paint Solutions"
        products = @(
            @{name="Primer Spray"; desc="High-build primer that provides excellent adhesion and smooth base for topcoats."},
            @{name="Color Match Paint"; desc="Precision-matched automotive colors for seamless touch-ups and repairs."},
            @{name="Clear Coat Spray"; desc="UV-resistant clear coat that protects paint and adds high-gloss finish."},
            @{name="Metallic Finish Paint"; desc="Metallic automotive paint for custom finishes and special effects."},
            @{name="Matt Black Spray"; desc="Premium matt finish perfect for trim, wheels, and custom detailing."},
            @{name="Chrome Effect Paint"; desc="Mirror-like chrome finish for decorative automotive applications."},
            @{name="Rust Converter Primer"; desc="Converts rust to stable surface while priming for paint application."},
            @{name="Wheel Paint"; desc="Heat-resistant formula specifically designed for alloy and steel wheels."}
        )
    },
    @{
        filename = "bulk-consumables-car.html"
        title = "Bulk Car Care Consumables"
        intro = "Our bulk car care consumables provide cost-effective solutions for car wash businesses, dealerships, and fleet operators. These large-format products maintain the same high quality as our retail offerings while delivering better value for high-volume operations. Perfect for businesses that demand consistent performance and reliable supply, our bulk range ensures you never run out of essential car care products."
        sectionTitle = "Bulk Car Care Products"
        products = @(
            @{name="Car Wash Concentrate 5L"; desc="Professional-strength concentrate for car wash operations and detailing shops."},
            @{name="Bulk Tire Shine"; desc="Economy-size tire dressing for high-volume detailing operations."},
            @{name="Glass Cleaner Refill"; desc="Large format glass cleaner for fleet washing and commercial operations."},
            @{name="Interior Cleaner Bulk"; desc="Multi-purpose interior cleaner in gallon sizes for efficiency."},
            @{name="Wax & Polish Combo Pack"; desc="Bundled wax and polish products at discounted bulk pricing."},
            @{name="Microfiber Towel Bundle"; desc="Professional-grade microfiber towels in economical bulk packs."},
            @{name="Detailing Clay Bar Kit"; desc="Bulk clay bar kits for professional paint decontamination."},
            @{name="Wheel Cleaner Gallon"; desc="Industrial-strength wheel cleaner in economical gallon containers."}
        )
    },
    @{
        filename = "home-care.html"
        title = "Home Care Products"
        intro = "Our home care range brings professional-grade cleaning and maintenance solutions to your household. From surface cleaners to specialty products, each formula is designed for effectiveness, safety, and ease of use. These products combine powerful cleaning action with pleasant fragrances, making household maintenance tasks quicker and more enjoyable. Perfect for maintaining a clean, healthy, and fresh-smelling home environment."
        sectionTitle = "Home Care Solutions"
        products = @(
            @{name="Multi-Surface Cleaner"; desc="All-purpose cleaner safe for countertops, tiles, and most household surfaces."},
            @{name="Glass & Mirror Spray"; desc="Streak-free formula for sparkling clean windows and glass surfaces."},
            @{name="Kitchen Degreaser"; desc="Powerful cleaner that cuts through grease and food residue on kitchen surfaces."},
            @{name="Bathroom Descaler"; desc="Removes limescale, soap scum, and water stains from bathroom fixtures."},
            @{name="Air Freshener Spray"; desc="Long-lasting fragrance that eliminates odors and freshens rooms."},
            @{name="Furniture Polish"; desc="Nourishing polish for wood furniture that adds shine and protection."},
            @{name="Stainless Steel Cleaner"; desc="Specialized cleaner for stainless steel appliances and fixtures."},
            @{name="Carpet & Upholstery Cleaner"; desc="Deep-cleaning formula for removing stains from carpets and fabric."}
        )
    }
)

$template = @'
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="nav.css">
	<link rel="stylesheet" type="text/css" href="footer.css">
	<title>{{TITLE}} - Twin Tech India</title>
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

		.products-showcase {
			padding: 80px 5vw;
			background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		}
		.products-showcase h2 {
			font-family: "Heading";
			font-size: 3rem;
			text-align: center;
			color: var(--color);
			margin-bottom: 60px;
		}
		.products-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 30px;
			max-width: 1400px;
			margin: 0 auto;
		}
		.product-card {
			background: white;
			border-radius: 20px;
			overflow: hidden;
			box-shadow: 0 10px 30px rgba(0,0,0,0.1);
			transition: transform 0.3s ease;
			cursor: pointer;
			position: relative;
		}
		.product-image-wrapper {
			width: 100%;
			height: 300px;
			background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			overflow: hidden;
		}
		.product-image-wrapper::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.3);
			opacity: 0;
			transition: opacity 0.3s ease;
		}
		.product-image-wrapper svg {
			width: 120px;
			height: 120px;
			stroke: white;
			position: relative;
			z-index: 1;
		}
		.product-info {
			padding: 25px;
		}
		.product-info h3 {
			font-family: "Heading";
			font-size: 1.5rem;
			color: #333;
			margin-bottom: 10px;
		}
		.product-info p {
			font-family: "base";
			font-size: 0.95rem;
			color: #666;
			line-height: 1.6;
		}
	</style>
</head>
<body>
	<nav>
		<div class="logo">
			<img src="./assets/logo.png">
		</div>
		<ul class="navigation">
			<li><a href="index.html">Home</a></li>
			<li class="has-dropdown">
				<a href="#" class="dropdown">About Us <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span></a>
				<ul class="dropdown-menu">
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Overview</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Customer Focus</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Application Areas</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Career</a></li>
				</ul>
			</li>
			<li class="has-dropdown">
				<a href="#" class="dropdown">Our Products <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span></a>
				<ul class="dropdown-menu">
					<li class="has-subdropdown">
						<a href="industrial-maintenance.html"><span class="arrow-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Industrial Maintenance<span class="chevron-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span></a>
						<ul class="subdropdown-menu">
							<li><a href="cleaner-degreasers.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Cleaner and Degreasers</a></li>
							<li><a href="rust-remover.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Rust Remover and Protector</a></li>
							<li><a href="insulating-coatings.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Insulating and Protecting Coatings</a></li>
							<li><a href="lubricants.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Lubricants and Anti Seize Spray</a></li>
							<li><a href="injection-molding.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Injection Moduling Spray</a></li>
							<li><a href="bulk-consumables-industrial.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Bulk Consumables</a></li>
						</ul>
					</li>
					<li class="has-subdropdown">
						<a href="car-care.html"><span class="arrow-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Car Care Products<span class="chevron-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span></a>
						<ul class="subdropdown-menu">
							<li><a href="two-wheeler.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Two Wheeler</a></li>
							<li><a href="four-wheeler.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Four Wheeler</a></li>
							<li><a href="additives.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Additives</a></li>
							<li><a href="spray-paint.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Spray Paint</a></li>
							<li><a href="bulk-consumables-car.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Bulk Consumables</a></li>
							<li><a href="home-care.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Home Care</a></li>
						</ul>
					</li>
					<li><a href="tapes.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Self Adhesive Tapes</a></li>
				</ul>
			</li>
			<li class="has-dropdown">
				<a href="#" class="dropdown">Our Brands<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span></a>
				<ul class="dropdown-menu">
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Evershine</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>SprayZet</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Twin Tapes</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Silox</a></li>
					<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Twinzy</a></li>
				</ul>
			</li>
			<li><a href="#">Our Gallery</a></li>
			<li><a href="#">Become a Distributor</a></li>
			<li><a href="#">Blog</a></li>
			<li><a href="#">Contact Us</a></li>
		</ul>
		<div class="action_buttons">
			<button class="search"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></button>
			<button class="whatsapp"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg></button>
		</div>
	</nav>

	<section class="category-intro">
		<h1>{{TITLE}}</h1>
		<p>{{INTRO}}</p>
	</section>

	<section class="products-showcase">
		<h2>{{SECTION_TITLE}}</h2>
		<div class="products-grid">
{{PRODUCTS}}
		</div>
	</section>

	<footer>
		<div class="top">
			<div class="logo">
				<img src="./assets/logo.png">
			</div>
			<div class="footer-info animate-text">
				Twin Tech India Pvt. Ltd. is a leading manufacturer of high-quality Industrial aerosol sprays, car care products, self-adhesive tapes and home care products for various industries worldwide.
			</div>
		</div>
		<div class="line"></div>
		<div class="mid">
			<div class="footer-navs">
			<ul class="nav-1">
				<h3>Quick Links</h3>
				<li><a href="index.html"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Home</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>About Us</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Our Clients</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Contact</a></li>
			</ul>
			<ul class="nav-2">
				<h3>Brands</h3>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Evershine</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>SprayZet</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Twin Tapes</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Silox</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>Twinzy</a></li>
			</ul>
			<ul class="nav-3">
				<h3>Download Catalog</h3>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg></span>Everhine</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg></span>SprayZet</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg></span>Twin Tapes</a></li>
			</ul>
			<ul class="nav-4">
				<h3>Get In Touch</h3>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></span>twin@twinindia.com</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></span>sales@twinindia.com</a></li>
				<li><a href="#"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg></span>91-9310052702</a></li>
			</ul>
		</div>
			<ul class="address">
				<li><a href="#">Office Address : A-304, Solitairian City Center, Knowledge Park III, Greater NOIDA (UP), India 201308</a></li>
				<li><a href="#">Work Address : R-51, 52 & 53, UPSIDC, Sikandrabad -203205 Uttar Pradesh</a></li>
				<ul class="socials">
					<li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a></li>
					<li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a></li>
					<li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></a></li>
					<li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a></li>
				</ul>
			</ul>
		</div>
		<div class="line"></div>
		<div class="bottom">
			<span>©Copyright 2026. All Rights Reserved.</span>
		</div>
	</footer>

	<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
	<script>
		gsap.registerPlugin(ScrollTrigger);

		// Product card hover animations
		const cards = document.querySelectorAll('.product-card');
		
		cards.forEach(card => {
			const imageWrapper = card.querySelector('.product-image-wrapper');
			const overlay = imageWrapper.querySelector('::before');
			const icon = imageWrapper.querySelector('svg');
			const title = card.querySelector('h3');
			
			const hoverTimeline = gsap.timeline({ paused: true });
			
			hoverTimeline
				.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
				.to(imageWrapper, { 
					'--overlay-opacity': 0.7,
					duration: 0.3 
				}, 0)
				.to(icon, { 
					scale: 1.2, 
					rotation: 5,
					duration: 0.3 
				}, 0)
				.to(title, { 
					color: '#dc143c',
					duration: 0.3 
				}, 0);
			
			card.addEventListener('mouseenter', () => hoverTimeline.play());
			card.addEventListener('mouseleave', () => hoverTimeline.reverse());

			// 3D tilt effect
			card.addEventListener('mousemove', (e) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				
				const centerX = rect.width / 2;
				const centerY = rect.height / 2;
				
				const rotateX = (y - centerY) / 10;
				const rotateY = (centerX - x) / 10;
				
				gsap.to(card, {
					rotationX: rotateX,
					rotationY: rotateY,
					duration: 0.3,
					transformPerspective: 1000,
					ease: 'power2.out'
				});
			});
			
			card.addEventListener('mouseleave', () => {
				gsap.to(card, {
					rotationX: 0,
					rotationY: 0,
					duration: 0.3
				});
			});
		});

		// Scroll-triggered entrance animations
		gsap.from('.product-card', {
			scrollTrigger: {
				trigger: '.products-grid',
				start: 'top 80%',
			},
			y: 50,
			opacity: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power2.out'
		});
	</script>
</body>
</html>
'@

$productCardTemplate = @'
			<div class="product-card">
				<div class="product-image-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg>
				</div>
				<div class="product-info">
					<h3>{{NAME}}</h3>
					<p>{{DESC}}</p>
				</div>
			</div>
'@

foreach ($page in $pages) {
    $productsHtml = ""
    foreach ($product in $page.products) {
        $card = $productCardTemplate.Replace("{{NAME}}", $product.name).Replace("{{DESC}}", $product.desc)
        $productsHtml += $card + "`n"
    }
    
    $content = $template.Replace("{{TITLE}}", $page.title)
    $content = $content.Replace("{{INTRO}}", $page.intro)
    $content = $content.Replace("{{SECTION_TITLE}}", $page.sectionTitle)
    $content = $content.Replace("{{PRODUCTS}}", $productsHtml)
    
    $content | Out-File -FilePath $page.filename -Encoding UTF8
    Write-Host "Created: $($page.filename)" -ForegroundColor Green
}

Write-Host "`nAll 6 car care pages created successfully!" -ForegroundColor Cyan
