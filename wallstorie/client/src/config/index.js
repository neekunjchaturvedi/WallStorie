export const addProductFormElements = [
  {
    label: "Product Name *",
    name: "productName",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    label: "Description *",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Product Type *",
    name: "productType",
    componentType: "select",
    options: [
      { id: "wallpapers", label: "Wallpapers" },
      { id: "wallpaperRolls", label: "Wallpaper Rolls" },
      { id: "curtains", label: "Curtains" },
      { id: "blinds", label: "Blinds" },
      { id: "artist", label: "Artist" },
    ],
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "heritage", label: "Heritage", productType: "wallpapers" },
      { id: "divine", label: "Divine", productType: "wallpapers" },
      { id: "tropical", label: "Tropical", productType: "wallpapers" },
      { id: "kidsSeries", label: "Kid Series", productType: "wallpapers" },
      { id: "roller", label: "Roller", productType: "blinds" },
      { id: "zebra", label: "Zebra", productType: "blinds" },
      { id: "roman", label: "Roman", productType: "blinds" },
      { id: "drape", label: "Drape", productType: "curtain" },
      { id: "sheer", label: "Sheer", productType: "curtain" },
    ],
  },
  {
    label: "Space",
    name: "space",
    componentType: "select",
    options: [
      { id: "LivingRoom", label: "Living Room" },
      { id: "BedRoom", label: "Bed Room" },
      { id: "KidsRoom", label: "Kids Room" },
      { id: "OfficeRoom", label: "Office Room" },
      { id: "PoojaRoom", label: "Pooja Room" },
      { id: "DiningRoom", label: "Dining Room" },
      { id: "Balcony", label: "Balcony" },
    ],
  },
  {
    label: "Color",
    name: "color",
    componentType: "select",
    options: [
      { id: "red", label: "Red" },
      { id: "blue", label: "Blue" },
      { id: "green", label: "Green" },
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "yellow", label: "Yellow" },
    ],
  },
  {
    label: "Trend",
    name: "trend",
    componentType: "select",
    options: [
      { id: "bestseller", label: "BestSeller" },
      { id: "trending", label: "Trending" },
      { id: "popular", label: "Popular" },
      { id: "newarrival", label: "New Arrival" },
      { id: "seasonal", label: "Seasonal" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price (if any discount)",
  },
  {
    label: "Sale Price *",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price(Compulsory)",
  },
  {
    label: "Discount *",
    name: "discount",
    componentType: "input",
    type: "number",
    placeholder: "Enter discount (optional)",
  },
  {
    label: "Stock Quantity *",
    name: "stockQuantity",
    componentType: "input",
    type: "number",
    placeholder: "Enter stock quantity",
  },
  {
    label: "Popularity",
    name: "popularity",
    componentType: "input",
    type: "number",
    placeholder: "Enter popularity",
  },
];
