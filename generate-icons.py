#!/usr/bin/env python3
"""
Script para gerar ícones PNG em diferentes tamanhos a partir do SVG
Requer: pip install cairosvg Pillow
"""

try:
    import cairosvg
    from PIL import Image
    import io
    import os

    # Tamanhos necessários para PWA
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]

    svg_path = 'icons/icon.svg'

    if not os.path.exists(svg_path):
        print(f"Erro: {svg_path} não encontrado!")
        exit(1)

    print("Gerando ícones PNG...")

    for size in sizes:
        output_path = f'icons/icon-{size}.png'

        # Converter SVG para PNG usando cairosvg
        png_data = cairosvg.svg2png(
            url=svg_path,
            output_width=size,
            output_height=size
        )

        # Salvar o PNG
        with open(output_path, 'wb') as f:
            f.write(png_data)

        print(f"✓ Criado: {output_path}")

    print("\nTodos os ícones foram gerados com sucesso!")

except ImportError:
    print("ERRO: Bibliotecas necessárias não instaladas.")
    print("\nPara gerar os ícones automaticamente, instale:")
    print("  pip install cairosvg Pillow")
    print("\nAlternativamente, você pode:")
    print("1. Abrir icons/icon.svg em um editor (Inkscape, GIMP, etc.)")
    print("2. Exportar nos seguintes tamanhos: 72, 96, 128, 144, 152, 192, 384, 512")
    print("3. Salvar como icon-[tamanho].png na pasta icons/")
