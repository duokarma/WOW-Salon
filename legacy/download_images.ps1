$images = @{
    "male_staff_1.jpg" = "Professional headshot portrait of a handsome young Indian male hairstylist, age 25, confident smile, wearing black salon apron, dark moody studio lighting, cinematic portrait photography, sharp focus, matte black background with subtle purple rim lighting, editorial fashion quality, 4K"
    "male_staff_2.jpg" = "Professional headshot portrait of a stylish Indian male barber, age 30, well-groomed beard, wearing black crew neck, dark studio lighting, cinematic portrait, matte black background with chrome silver rim lighting, editorial quality, 4K"
    "male_staff_3.jpg" = "Professional headshot portrait of a young Indian male hair colorist, age 26, trendy hairstyle, wearing black t-shirt, moody studio lighting, cinematic portrait photography, dark background with subtle neon purple accent lighting, editorial quality, 4K"
    "male_staff_4.jpg" = "Professional headshot portrait of a mature Indian male master stylist, age 38, distinguished look, wearing black formal shirt, dramatic studio lighting, cinematic portrait, matte black background with warm rim lighting, editorial fashion quality, 4K"
    "male_staff_5.jpg" = "Professional headshot portrait of a young Indian male salon professional, age 24, clean shaven, modern hairstyle, wearing black polo, dark studio with purple and silver accent lighting, cinematic portrait photography, editorial quality, 4K"
    "female_staff_1.jpg" = "Professional headshot portrait of a beautiful Indian female hairstylist, age 28, elegant makeup, wearing black salon outfit, dark moody studio lighting, cinematic portrait photography, matte black background with soft purple glow, editorial fashion quality, 4K"
    "female_staff_2.jpg" = "Professional headshot portrait of a stylish Indian female makeup artist, age 29, flawless makeup, wearing black top, dramatic studio lighting, cinematic portrait, dark background with holographic rim lighting, editorial quality, 4K"
    "female_staff_3.jpg" = "Professional headshot portrait of a young Indian female hair colorist, age 25, colorful highlights in hair, wearing black outfit, moody studio lighting, cinematic portrait photography, matte black background with neon accent, editorial quality, 4K"
    "female_staff_4.jpg" = "Professional headshot portrait of a elegant Indian female senior stylist, age 33, sophisticated look, wearing black formal attire, dramatic cinematic lighting, dark background with silver and purple rim lighting, editorial fashion quality, 4K"
    "gallery_1.jpg" = "Luxury hair salon interior, cinematic photo of a woman getting a premium hair styling treatment, dark moody lighting, chrome and black salon furniture, mirrors with LED lighting, editorial fashion photography, 4K"
    "gallery_2.jpg" = "Close-up of expert hands styling a woman's beautiful wavy hair, dark salon background, dramatic lighting, chrome scissors visible, editorial beauty photography, cinematic quality, 4K"
    "gallery_3.jpg" = "Handsome man getting a premium fade haircut in a luxury barber chair, dark moody salon interior, chrome accents, cinematic lighting, editorial quality photography, 4K"
    "gallery_4.jpg" = "Beautiful woman with stunning hair color transformation, balayage highlights, dark salon background, dramatic beauty lighting, editorial fashion photography, cinematic quality, 4K"
    "gallery_5.jpg" = "Professional bridal makeup and hair styling session, luxury salon setting, dark elegant background, soft dramatic lighting, editorial beauty photography, 4K"
    "gallery_6.jpg" = "Man with perfectly styled modern pompadour haircut, premium grooming result, dark studio background with chrome accents, cinematic portrait lighting, editorial quality, 4K"
    "before_1.jpg" = "Woman with frizzy damaged hair, no styling, natural unflattering lighting, plain background, before hair treatment photo, realistic photography, 4K"
    "after_1.jpg" = "Same woman now with gorgeous sleek smooth shiny styled hair, stunning hair transformation result, dramatic beauty lighting, dark premium salon background, after treatment photo, editorial quality, 4K"
    "before_2.jpg" = "Man with overgrown messy unkempt hair and beard, no styling, plain background, before grooming photo, realistic photography, 4K"
    "after_2.jpg" = "Same man now with perfectly styled modern haircut and trimmed beard, stunning grooming transformation, dramatic lighting, dark premium background, after treatment photo, editorial quality, 4K"
    "service_men_1.jpg" = "Premium men's haircut service in luxury barber chair, dark moody salon, chrome accents, cinematic lighting, editorial photography, 4K"
    "service_men_2.jpg" = "Professional beard grooming and shaping service, luxury barbershop, dark moody lighting, chrome tools, cinematic quality, editorial photography, 4K"
    "service_men_3.jpg" = "Men's premium hair color treatment in luxury salon, dark moody setting, professional application, cinematic lighting, editorial quality, 4K"
    "service_women_1.jpg" = "Premium women's hair styling service, luxury salon chair, dark elegant interior, dramatic lighting, editorial beauty photography, 4K"
    "service_women_2.jpg" = "Professional bridal makeup application in luxury salon, dark moody setting, soft dramatic lighting, editorial beauty photography, 4K"
    "service_women_3.jpg" = "Women's hair color and highlights treatment, luxury salon setting, dark moody lighting, professional colorist at work, editorial quality, 4K"
    "about_salon.jpg" = "Luxury modern hair salon interior, dark moody atmosphere, chrome and matte black furniture, LED accent lighting in purple and silver tones, premium salon chairs, large mirrors, cinematic interior photography, editorial quality, 4K"
    "hero_bg.jpg" = "Abstract dark cinematic background, matte black with subtle purple and silver holographic light streaks, chrome metallic particles floating, futuristic luxury atmosphere, deep space aesthetic with subtle fog, 8K quality"
}

Write-Host "Starting image generation and download..."
foreach ($img in $images.GetEnumerator()) {
    $filename = $img.Name
    $prompt = $img.Value
    Write-Host "Generating: $filename"
    $url = "https://image.pollinations.ai/prompt/" + [uri]::EscapeDataString($prompt) + "?width=800&height=1200&nologo=true&model=flux"
    $filepath = "d:\WOW-salon\assets\images\$filename"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $filepath -UseBasicParsing
        Write-Host "Saved: $filename"
    } catch {
        Write-Host "Failed to save: $filename"
    }
}
Write-Host "All images downloaded."
