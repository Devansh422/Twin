# PowerShell script to generate product subcategory pages

# Define page data
$pages = @(
    @{
        filename = "rust-remover.html"
        title = "Rust Remover and Protector"
        intro = "Our advanced rust removal and protection solutions are engineered to combat corrosion in the harshest industrial environments. From surface rust removal to long-term protection, our aerosol formulas provide fast-acting treatment that penetrates deep into metal surfaces. These products not only remove existing rust but also create a protective barrier against future oxidation, extending the life of your equipment and reducing maintenance costs."
        sectionTitle = "Rust Removal & Protection Products"
        products = @(
            @{name="Rust Converter Pro"; desc="Converts rust into a stable, paintable surface while providing long-term corrosion protection."},
            @{name="Flash Rust Inhibitor"; desc="Prevents flash rusting on freshly cleaned or machined metal surfaces during processing."},
            @{name="Corrosion Protector Spray"; desc="Creates a moisture-resistant barrier that protects metal from rust and corrosion."},
            @{name="Rust Penetrant"; desc="Penetrates deep into rusted parts to loosen seized bolts, nuts, and components."},
            @{name="Marine Grade Rust Blocker"; desc="Heavy-duty protection designed for marine and coastal industrial applications."},
            @{name="Galvanizing Spray"; desc="Provides zinc-rich coating that offers galvanic protection to steel surfaces."},
            @{name="Rust Remover Gel"; desc="Thick gel formula that clings to vertical surfaces for effective rust removal."},
            @{name="Cavity Wax Rustproofing"; desc="Penetrating wax formula for protecting hollow sections and hard-to-reach cavities."}
        )
    },
    @{
        filename = "insulating-coatings.html"
        title = "Insulating and Protecting Coatings"
        intro = "Our industrial-grade insulating and protecting coatings provide comprehensive protection for electrical systems and sensitive equipment. These specialized formulas offer electrical insulation, moisture barriers, and environmental protection in a convenient aerosol format. Ideal for electrical panels, motor windings, circuit boards, and outdoor installations, our coatings prevent short circuits, corrosion, and environmental damage while maintaining operational safety and reliability."
        sectionTitle = "Insulating & Protective Coating Products"
        products = @(
            @{name="Electrical Insulation Spray"; desc="High dielectric strength coating for electrical components and connections."},
            @{name="Conformal Coating"; desc="Protects circuit boards from moisture, dust, and environmental contaminants."},
            @{name="Motor Winding Varnish"; desc="Impregnating varnish for electric motor windings and transformers."},
            @{name="Moisture Barrier Coating"; desc="Creates waterproof seal on electrical equipment and outdoor installations."},
            @{name="Anti-Tracking Spray"; desc="Prevents electrical tracking and arcing on insulators and connectors."},
            @{name="Thermal Insulation Coat"; desc="Heat-resistant coating for high-temperature applications and thermal barriers."},
            @{name="UV Protection Spray"; desc="Protects surfaces from UV degradation and environmental weathering."},
            @{name="Cold Galvanizing Compound"; desc="Zinc-rich coating providing cathodic protection equivalent to hot-dip galvanizing."}
        )
    },
    @{
        filename = "lubricants.html"
        title = "Lubricants and Anti Seize Spray"
        intro = "Our comprehensive range of industrial lubricants and anti-seize compounds are formulated to reduce friction, prevent wear, and protect against seizure in demanding applications. From general-purpose lubricants to specialized high-temperature formulas, our products ensure smooth operation, extend component life, and reduce maintenance downtime. Each product is engineered to withstand extreme pressures, temperatures, and environmental conditions typical in industrial settings."
        sectionTitle = "Lubricant & Anti-Seize Products"
        products = @(
            @{name="Multi-Purpose Penetrating Oil"; desc="Frees frozen parts, prevents rust, and provides long-lasting lubrication."},
            @{name="Silicone Lubricant Spray"; desc="Non-staining lubricant ideal for plastics, rubber, and delicate mechanisms."},
            @{name="White Lithium Grease"; desc="Heavy-duty lubricant for metal-to-metal applications under high loads."},
            @{name="Anti-Seize Compound"; desc="Prevents galling and seizing on threaded fasteners in high-temperature environments."},
            @{name="Chain and Cable Lube"; desc="Penetrating lubricant for chains, cables, and wire ropes in industrial settings."},
            @{name="Dry Film Lubricant"; desc="PTFE-based lubricant that reduces friction without attracting dust or dirt."},
            @{name="High-Temp Lubricant"; desc="Withstands extreme temperatures up to 500°C while maintaining lubrication properties."},
            @{name="Food Grade Lubricant"; desc="NSF certified lubricant safe for use in food processing and pharmaceutical industries."}
        )
    },
    @{
        filename = "injection-molding.html"
        title = "Injection Molding Spray"
        intro = "Our specialized injection molding release agents and maintenance sprays are designed to optimize plastic injection molding operations. These formulations ensure clean part release, extend mold life, and maintain consistent production quality. Safe for use with various plastics and mold materials, our products reduce cycle times, minimize defects, and improve overall manufacturing efficiency. Perfect for high-volume production environments where consistency and quality are paramount."
        sectionTitle = "Injection Molding Products"
        products = @(
            @{name="Universal Mold Release"; desc="All-purpose release agent compatible with most thermoplastics and mold types."},
            @{name="Silicone Mold Release"; desc="High-performance silicone-based formula for complex mold geometries."},
            @{name="Water-Based Mold Release"; desc="Environmentally friendly, non-flammable release agent for sensitive applications."},
            @{name="High-Temp Mold Release"; desc="Heat-resistant formula for high-temperature molding processes."},
            @{name="Anti-Stick Coating"; desc="Prevents material buildup on mold surfaces and hot runner systems."},
            @{name="Mold Cleaner Spray"; desc="Quickly removes residue, release agent buildup, and contaminants from molds."},
            @{name="Rust Preventive for Molds"; desc="Protects idle molds from corrosion during storage periods."},
            @{name="Ejector Pin Lubricant"; desc="Specialized lubricant for ejector pins and sliding mold components."}
        )
    },
    @{
        filename = "bulk-consumables-industrial.html"
        title = "Bulk Consumables"
        intro = "Our bulk consumable solutions cater to high-volume industrial operations requiring cost-effective maintenance and cleaning supplies. Available in larger formats and economical packaging, these products maintain the same high quality as our standard offerings while providing better value for large-scale operations. Ideal for manufacturing facilities, maintenance departments, and industrial cleaning services that demand reliable performance and consistent supply."
        sectionTitle = "Bulk Industrial Consumables"
        products = @(
            @{name="Bulk Degreaser Concentrate"; desc="Concentrated industrial degreaser that can be diluted for various cleaning applications."},
            @{name="Maintenance Kit Bundle"; desc="Complete maintenance solution including lubricants, cleaners, and protection sprays."},
            @{name="Industrial Cleaner 5L"; desc="Heavy-duty cleaning solution in economical 5-liter containers."},
            @{name="Bulk Rust Protection"; desc="Large format rust preventive for coating extensive surface areas."},
            @{name="Workshop Lubricant Set"; desc="Assorted lubricants packaged for complete workshop coverage."},
            @{name="Aerosol Multi-Pack"; desc="Cost-effective multi-pack of popular maintenance aerosols."},
            @{name="Industrial Wipes Bulk"; desc="Heavy-duty cleaning wipes in bulk packaging for high-traffic areas."},
            @{name="Safety Solvent Bulk"; desc="Large quantity safety-approved cleaning solvent for industrial use."}
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
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/></svg>
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

Write-Host "`nAll 5 industrial pages created successfully!" -ForegroundColor Cyan
