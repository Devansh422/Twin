(function () {
    // Detect base path from assets-config
    var scripts = document.getElementsByTagName('script');
    var basePath = '';
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].getAttribute('src') || '';
        if (src.indexOf('global-search') !== -1) {
            basePath = src.substring(0, src.indexOf('assets/'));
            break;
        }
    }

    var allSiteProducts = [
        // ===== SPRAYZET =====
        { name: "SAFETY SOLVENT", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/1.SAFETY SOLVENT/1. safety solvent 700ML PACK SIZE.JPG" },
        { name: "AIR DUSTER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/10. AIR DUSTER/AIR DUSTER 700ML PACK SIZE.jpeg" },
        { name: "BEARING SOLVENT", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/11. BEARING SOLVENT/BEARING SOLVENT 500ML PACK SIZE.jpg" },
        { name: "FABRIC SPOT REMOVER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/12. FABRIC SPOT REMOVER/FABRIC SPOT REMOVER 700ML PACK SIZE.JPG" },
        { name: "GASKET REMOVER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/12. GASKET REMOVER/GASKET REMOVER 700ML PACK SIZE.jpeg" },
        { name: "SAFE CLEAN", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/2. SAFE CLEAN/2. SAFE CLEAN (OFFLINE) 500ML PACK SIZE.jpg" },
        { name: "ELECTRONIC CLEANER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/3. ELECTRONIC CLEANER/ELECTRONIC CLEANER 500ML PACK SIZE.jpg" },
        { name: "FOAM CLEANER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/4. FOAM CLEANER/FOAM CLEANER 700ML PACK SIZE ONLY.png" },
        { name: "TUFF CLEAN", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/6. TUFF CLEAN/TUFF CLEAN 700ML PACK SIZE.webp" },
        { name: "CARBON REMOVER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/7. CARBON REMOVER/CARBON REMOVER 700ML PACK SIZE.JPG" },
        { name: "OPTICAL FIBRE CABLE CLEANER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/8. OPTICAL FIBRE CABLE CLEANER/optical fibre Cable CLEANER 700ML PACK SIZE.png" },
        { name: "ELECTRICAL BREAKER CLEANER", brand: "SprayZet", category: "Cleaners & Degreasers", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/1. CLEANERS AND DEGREASERS/9. ELECTRICAL BREAKER CLEANER/electrical breaker cleaner 700ML PACK SIZE.png" },
        { name: "PEN OIL", brand: "SprayZet", category: "Rust Remover & Protector", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/2. RUST REMOVER & PROTECTOR/1. PEN OIL/PEN OIL 500ML PACK SIZE.jpg" },
        { name: "ALL-4 (Multi-Purpose Rust Remover)", brand: "SprayZet", category: "Rust Remover & Protector", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/2. RUST REMOVER & PROTECTOR/2. ALL-4 (Multi-Purpose Rust Remover)/ALL-4 500ML PACK SIZE.jpg" },
        { name: "RUST INHIBITOR", brand: "SprayZet", category: "Rust Remover & Protector", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/2. RUST REMOVER & PROTECTOR/3. RUST INHIBITOR/RUST INHIBITOR  700ML PACK SIZE.jpeg" },
        { name: "AIR TOOL LUBE", brand: "SprayZet", category: "Rust Remover & Protector", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/2. RUST REMOVER & PROTECTOR/4. AIR TOOL LUBE/AIR TOOL LUBE 700ML PACK SIZE.jpeg" },
        { name: "RED INSULATING VARNISH", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/1. RED INSULATING VARNISH/RED INSULATING VARNISH 500ML PACK SIZE.jpg" },
        { name: "ANTI-TRACK", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/2, ANTI-TRACK/ANTI TRACK  700ML PACK SIZE.JPG" },
        { name: "BATTERY TERMINAL COATING", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/3. BATTERY TERMINAL COATING/500ML PACK SIZE.jpg" },
        { name: "PCB COATING", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/4. PCB COATING/PCB COATING  700ML PACK SIZE.JPG" },
        { name: "MOISTURE DISPLACER", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/5. MOISTURE DISPLACER/MOISTURE DISPLACER  700ML PACK SIZE.jpeg" },
        { name: "DRY GRAPHITE CONDUCTIVE SEALANT", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/6. DRY GRAPHITE CONDUCTIVE SEALANT/DRY GRAPHITE CONDUCTIVE SEALANT  700ML PACK SIZE.jpeg" },
        { name: "COLD GALVANIZING COMPOUND", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/7. COLD GALVANIZING COMPOUND/COLD GALVANIZING COMPOUND 500ML PACK SIZE.jpg" },
        { name: "BELT DRESSING", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/8. BELT DRESSING/BELT DRESSING  700ML PACK SIZE.jpeg" },
        { name: "ZINC SPRAY", brand: "SprayZet", category: "Insulative & Protective Coatings", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/3. INSULATIVE & PROTECTIVE COATINGS/9. ZINC SPRAY/ZINC SPRAY 500ML PACK SIZE.jpg" },
        { name: "PTFE DRY FILM LUBRICANT", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/1. PTFE DRY FILM LUBRICANT/PTFE DRY FILM LUBRICANT 700ML  PACK SIZE.jpeg" },
        { name: "HIGH TEMPERATURE PAINT", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/10. HIGH TEMPERATURE PAINT/HIGH TEMP PAINT 700ML.jpg" },
        { name: "DPT KIT", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/11. DPT KIT/1. CLEANER/CLEANER 500ML.jpg" },
        { name: "ANTI-SPATTER", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/12. ANTI-SPATTER/ANTI SPATTER 500ML PACK SIZE.jpg" },
        { name: "DRY MOLY LUBRICANT", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/2. DRY MOLY LUBRICANT/700 ML PACK SZIE.jpeg" },
        { name: "DRY GRAPHITE LUBRICANT", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/3. DRY GRAPHITE LUBRICANT/DRY GRAPHITE LUBRICANT 700ML.jpeg" },
        { name: "WHITE LITHIUM GREASE", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/4. WHITE LITHIUM GREASE/WHITE LITHIUM GREASE 700ML PACK SZIE.JPG" },
        { name: "MOLY CHAIN LUBE", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/5. MOLY CHAIN LUBE/moly chain lube 700ML PACK SIZE.JPG" },
        { name: "WIRE ROPE LUBE", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/6. WIRE ROPE LUBE/WIRE ROPE LUBE 700ML PACK SIZE.jpeg" },
        { name: "DRIPLESS OIL", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/7. DRIPLESS OIL/DRIPLESS OIL 700ML PACK SIZE.jpeg" },
        { name: "MOLY ANTI-SEIZE", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/8. MOLY ANTI-SEIZE/MOLY ANTI SEIZE 700ML PACK SIZE.png" },
        { name: "CU-ANTI-SEIZE", brand: "SprayZet", category: "Lubricants & Antiseize Spray", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/4. LUBRICANTS & ANTISEIZE SPRAY/9. CU-ANTI-SEIZE/CU ANTISEIZE 700ML PACK SIZE.jpeg" },
        { name: "MOULD & DIE PROTECTOR", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/1. MOULD & DIE PROTECTOR/500ML.jpg" },
        { name: "WAX KOTE", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/2. WAX KOTE/WAX KOTE 500ML.jpg" },
        { name: "SILCO-R (SILICONE SPRAY)", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/3. SILCO-R (SILICONE SPRAY)/500ML.jpg" },
        { name: "MOULD CLEAN", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/4. MOULD CLEAN/MOULD CLEAN 700ML PACK SIZE.JPG" },
        { name: "SILCO-FREE (NON-SILICONE SPRAY)", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/5. SILCO-FREE (NON-SILICONE SPRAY)/SILCO-FREE (NON-SILICONE) 700ML PACK SIZE.JPG" },
        { name: "TEFLON GEL", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/6. TEFLON GEL/TEFLON GEL 700ML PACK SIZE.jpeg" },
        { name: "RUBBER RELEASE", brand: "SprayZet", category: "Injection Moulding", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/5. INJECTION MOULDING/7. RUBBER RELEASE/RUBBER RELEASE 700ML PACK SIZE.JPG" },
        { name: "SPRAYZET BULK CONSUMABLES", brand: "SprayZet", category: "Bulk Consumables", brandPage: "sprayzet/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/1. SPRAYZET/INDUSTRIAL MAINTENANCE PRODUCTS UNDER BRAND SPRAYZET/CATEGORY/6. BULK CONSUMABLES/SPRAYZET BULK CONSUMABLES/1. CARBO CLEAN BULK.png" },

        // ===== EVERSHINE =====
        { name: "ALL-IN-ONE", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/1. ALL-IN-ONE/ALL-IN-ONE 500ML.jpg" },
        { name: "ADHESIVE CHAIN LUBE", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/2. ADHESIVE CHAIN LUBE/ADHESIVE CHAIN LUBE 500ML.jpg" },
        { name: "BRAKE CLEANER", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/3. BRAKE CLEANER/BRAKE CLEANER 500ML.jpg" },
        { name: "CHAIN CLEANER", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/4. CHAIN CLEANER/CHAIN CLEANER 500ML.jpg" },
        { name: "SILENCER COATING", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/5. SILENCER COATING/SILENCER COATING 500ML.jpg" },
        { name: "TYRE SHINER", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/6. TYRE SHINER/500ML PACK SIZE.png" },
        { name: "VINYL CARE", brand: "Evershine", category: "Two Wheeler Bike", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/1.TWO WHEELER BIKE/7. VINYL CARE/1.png" },
        { name: "AUTO BODY SHINER", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/1. AUTO BODY SHINER/500ML PACK SIZE.png" },
        { name: "SPRAY GREASE", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/10.SPRAY GREASE/SPRAY GREASE IMG 1.jpg" },
        { name: "RUBBER CARE", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/11. RUBBER CARE/RUBBER CAR CARE IMG1.jpg" },
        { name: "RODENT REPELLENT", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/12. RODENT REPELLENT/RODEMT REPELLENT IMG 1.jpg" },
        { name: "AC DISINFECTANT", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/13. AC DISINFECTANT/1.png" },
        { name: "ELECTRICAL CONTACT CLEANER", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/14. ELECTRICAL CONTACT CLEANER/500ml.jpg" },
        { name: "UNDERBODY ANTI-RUST COATING", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/15. UNDERBODY ANTI-RUST COATING/Under-Body-Anti-Rust-Coating 1 LTR PACK SIZE.jpg" },
        { name: "CAR WASH SHAMPOO", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/16. CAR WASH SHAMPOO/1ltr pack size.jpg" },
        { name: "COOLANT", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/17. COOLANT/1LTR PACK SIZE.jpg" },
        { name: "VINYL CARE", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/18. VINYL CARE/1.png" },
        { name: "DASHBOARD SHINER", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/2. DASHNOARD SHINER/500ML PACK SIZE.png" },
        { name: "TYRE SHINER", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/3. TYRE SHINER/500ML PACK SIZE.png" },
        { name: "ALL-IN-ONE (Rust-Off)", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/4. ALL-IN-ONE (Rust-Off)/ALL-IN-ONE 500ML.jpg" },
        { name: "ENGINE LACQUER COATING", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/5. ENGINE LACQUER COATING/500ML.jpg" },
        { name: "BATTERY TERMINAL COATING", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/6. BATTERY TERMINAL COATING/500ML.jpg" },
        { name: "THROTTLE BODY CLEANER", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/7. THROTLLE BODY CLEANER/THROTTLE BODY IMG 1.jpg" },
        { name: "SILENCER COATING", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/8. SILENCER COATING/SILENCER COATING IMG1.jpg" },
        { name: "BRAKE CLEANER", brand: "Evershine", category: "Four Wheeler Car Care", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/2.FOUR WHEELER CAR CARE PRODUCTS/9. BRAKE CLEANER/BRAKE CLEANER.jpg" },
        { name: "ENGINE OIL ADDITIVES", brand: "Evershine", category: "Additives", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/3. ADDITIVES/1. ENGINE OIL ADDITIVES/Engine-Oil-Additive.jpg" },
        { name: "PETROL ADDITIVES", brand: "Evershine", category: "Additives", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/3. ADDITIVES/2. PETROL ADDITIVES/Petrol-Additive.jpg" },
        { name: "DIESEL ADDITIVES", brand: "Evershine", category: "Additives", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/3. ADDITIVES/3. DIESEL ADDITIVES/Diesel-Additive.jpg" },
        { name: "ENGINE OIL FLUSH", brand: "Evershine", category: "Additives", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/3. ADDITIVES/4. ENGINE OIL FLUSH/ENGINE OIL FLUSH 250ML IMG-1.jpg" },
        { name: "RADIATOR FLUSH", brand: "Evershine", category: "Additives", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/3. ADDITIVES/5. RADIATOR FLUSH/Radiator-Flush.jpg" },
        { name: "WIND SHIELD CLEANER", brand: "Evershine", category: "Additives", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/3. ADDITIVES/6. WIND SHIELD CLEANER/Wind-Shield-Cleaner.jpg" },
        { name: "SPRAY PAINTS", brand: "Evershine", category: "Spray Paints", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/4. SPRAY PAINTS/1.png" },
        { name: "Car Shampoo Bulk", brand: "Evershine", category: "Bulk Consumables", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/5. BULK CONSUMABLES/Car-Shampoo-Bulk.jpg" },
        { name: "Coolant Bulk", brand: "Evershine", category: "Bulk Consumables", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/5. BULK CONSUMABLES/COOLANT BULK.jpg" },
        { name: "Engine Lacquer Coating Bulk", brand: "Evershine", category: "Bulk Consumables", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/5. BULK CONSUMABLES/Engine-Lacquer-Coating-Bulk.jpg" },
        { name: "Tyre Shiner Bulk", brand: "Evershine", category: "Bulk Consumables", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/5. BULK CONSUMABLES/Tyre-Shiner-Bulk.jpg" },
        { name: "Vinyl Protector Bulk", brand: "Evershine", category: "Bulk Consumables", brandPage: "evershine/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/2. EVERSHINE/EVERSHINE CAR CARE PRODUCTS/5. BULK CONSUMABLES/Vinyl-Protector-Bulk.jpg" },

        // ===== TWIN TAPES =====
        { name: "DS POLYESTER TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/1. DS POLYESTER TAPE.jpg" },
        { name: "Red-Polyester-Tape FILMIC LINER", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/10.Red-Polyester-Tape FILMIC LINER.jpg" },
        { name: "MASKING TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/11. MASKING TAPE.jpg" },
        { name: "SURFACE-PROTECTION-TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/12. SURFACE-PROTECTION-TAPE.jpg" },
        { name: "SS FOAM TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/13. SS FOAM TAPE.jpg" },
        { name: "Acrylic-Foam-Tape (VHB TAPE)", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/14. Acrylic-Foam-Tape (VHB TAPE).jpg" },
        { name: "Kraft-Paper-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/15. Kraft-Paper-Tape.jpg" },
        { name: "BOPP TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/16. BOPP TAPE.jpg" },
        { name: "PVC-Insulation-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/17. PVC-Insulation-Tape.jpg" },
        { name: "ADVERTISEMENT & BOPP PRINTED TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/18. ADVERTISEMENT & BOPP PRINTED TAPE.jpg" },
        { name: "Silicon-Self-Fusing-Hit-Tape (SF-555)", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/19. Silicon-Self-Fusing-Hit-Tape (SF-555).jpg" },
        { name: "Tissue-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/2.Tissue-Tape.jpg" },
        { name: "Self Amalgamating Tape (SF-556)", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/20. Self Amalgamating Tape (SF-556).jpg" },
        { name: "Pink-Rayon-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/21. Pink-Rayon-Tape.jpg" },
        { name: "Kapton-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/22. Kapton-Tape.jpg" },
        { name: "Cotton-Cloth-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/23. Cotton-Cloth-Tape.jpg" },
        { name: "HDPE-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/24 HDPE-Tape.jpg" },
        { name: "SINGLE SIDE POLYESTER TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/25 SINGLE SIDE POLYESTER TAPE.jpeg" },
        { name: "Cloth-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/3.Cloth-Tape.jpg" },
        { name: "DS FOAM TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/4. DS FOAM TAPE.jpg" },
        { name: "Floor-Marking-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/5. Floor-Marking-Tape.jpg" },
        { name: "ALUMINIUM FOIL TAPE", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/6. ALUMINIUM FOIL TAPE.jpg" },
        { name: "Duct-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/7.Duct-Tape.jpg" },
        { name: "Filament-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/8.Filament-Tape.jpg" },
        { name: "Blue-Door-Holding-Tape", brand: "Twin Tapes", category: "Twin Tapes", brandPage: "twin-tapes/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/3. TWIN TAPE/9. Blue-Door-Holding-Tape.jpg" },

        // ===== TWINZY =====
        { name: "CITRUS", brand: "Twinzy", category: "Air Freshener", brandPage: "twinzy/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/1. AIR FRESHNER/AIR FRESHNER CITRUS.jpg" },
        { name: "JASMINE", brand: "Twinzy", category: "Air Freshener", brandPage: "twinzy/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/1. AIR FRESHNER/AIR FRESHNER JASMINE.jpg" },
        { name: "LAVENDER", brand: "Twinzy", category: "Air Freshener", brandPage: "twinzy/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/1. AIR FRESHNER/AIR FRESHNER LAVENDER.jpg" },
        { name: "FURNITURE POLISH 1", brand: "Twinzy", category: "Furniture Polish", brandPage: "twinzy/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/2. FURNITURE POLISH/1.png" },
        { name: "FURNITURE POLISH 5", brand: "Twinzy", category: "Furniture Polish", brandPage: "twinzy/", imagePath: "BRAND WISE PRODUCTS-20260130T003450Z-3-001/BRAND WISE PRODUCTS/4. TWINZY/1. HOME CARE PRODUCTS/2. FURNITURE POLISH/5.png" }
    ];

    // Inject search button into nav action_buttons
    function injectSearchButton() {
        var actionButtons = document.querySelector('nav .action_buttons');
        if (!actionButtons) return;

        var searchBtn = document.createElement('button');
        searchBtn.type = 'button';
        searchBtn.className = 'search-toggle';
        searchBtn.setAttribute('aria-label', 'Search products');
        searchBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        actionButtons.insertBefore(searchBtn, actionButtons.firstChild);

        searchBtn.addEventListener('click', openSearch);
    }

    // Inject search overlay into body
    function injectSearchOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'global-search-overlay';
        overlay.className = 'search-overlay';
        overlay.innerHTML =
            '<div class="search-container">' +
                '<div class="search-input-wrapper">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
                    '<input type="text" id="global-search-input" placeholder="Search products across all brands..." autocomplete="off">' +
                    '<button type="button" class="search-close" id="search-close-btn" aria-label="Close search">&times;</button>' +
                '</div>' +
                '<div class="search-results" id="search-results"></div>' +
            '</div>';
        document.body.appendChild(overlay);

        document.getElementById('search-close-btn').addEventListener('click', closeSearch);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeSearch();
        });
        document.getElementById('global-search-input').addEventListener('input', handleSearch);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeSearch();
        });
    }

    function openSearch() {
        var overlay = document.getElementById('global-search-overlay');
        if (!overlay) return;
        overlay.classList.add('active');
        setTimeout(function () {
            document.getElementById('global-search-input').focus();
        }, 100);
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        var overlay = document.getElementById('global-search-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.getElementById('global-search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
        document.body.style.overflow = '';
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function handleSearch(e) {
        var query = (e.target.value || '').trim().toLowerCase();
        var resultsContainer = document.getElementById('search-results');

        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        var words = query.split(/\s+/);
        var matches = allSiteProducts.filter(function (p) {
            var text = (p.name + ' ' + p.brand + ' ' + p.category).toLowerCase();
            return words.every(function (w) { return text.indexOf(w) !== -1; });
        }).slice(0, 15);

        if (matches.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No products found for "' + escapeHtml(e.target.value.trim()) + '"</div>';
            return;
        }

        var html = '';
        for (var i = 0; i < matches.length; i++) {
            var p = matches[i];
            var imgSrc = basePath + encodeURI(p.imagePath);
            var href = basePath + p.brandPage + '?product=' + encodeURIComponent(p.name);
            html += '<a href="' + href + '" class="search-result-item">' +
                '<img src="' + imgSrc + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' +
                '<div class="search-result-info">' +
                    '<span class="search-result-name">' + escapeHtml(p.name) + '</span>' +
                    '<span class="search-result-meta">' + escapeHtml(p.brand) + ' &bull; ' + escapeHtml(p.category) + '</span>' +
                '</div>' +
            '</a>';
        }
        resultsContainer.innerHTML = html;
    }

    function init() {
        injectSearchButton();
        injectSearchOverlay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
