const categories: Record<string, string[]> = {
  'Vanzon items': [
    'Indian summer mix juice','Pulco lemon juice','Almonds','Vinegar','Dried orange','Rose petals','Chef natural Chick broth','Chili sauce','White chcolate','Nutella','Lemon sirop','Curry Ketchup (6 liters)','Bar cookies (Desire)','Frying oil (15L VanZon Chef)','Coconut milk (Golden turtle 1 litre)','GOLDEN TURTLE PANEERMIX TEMPURA','Honey 1kg','Milk Inox full cream (12 x 1 L)','Cinnamon sticks for Bar','Kimchi sauce','Maggi aroma','Corn Flour','Mayonnaise 3L','Milk packs for coffee','Sugar strips for coffee','Olive oil (Delizio 1L)','Oyster sauce','Paneermix Panco','Pesto','Edible spoon','Plums','Coconut powder','Pista','Walnut (1/4 1,15KG)','Redwine vinegar','Vegan cream (1L)','Sugar (1kg x 10)','Tabasco sauce','Pinenuts','Kishmish','Frozen tortilla (25cm 12 st)','Textura Xantana','Tomato puree 4.5kg','Truffel oil','Vegan mayo','Sunflower oil (3kg)','Salt (1kg x 10)','Hand towel for bathroom','Gloves','Hand wash','Bread basket paper','Toilet paper (8x8)','Kitchen roll','Table tissues','Table clean spray (pulsar)','Aluminium foil','Clean film wrap','Blue bags (PMD)','Dishwashing liquid','Cloth washing liquid','Onion cubes (1kg)','Vegan yoghurt (Alpro)','Burrata (Galbani)','Cream 2L (Debic)','Egg','Griek Yoghurt (1kg)','Inox mango lassi yoghurt (1L)','Selecta cheese (400g)','Mozzarella (Galbani)','Parmesan cheese','Philadelphia cheese','Pineapple juice','Avocado frozen','Mushroom frozen','Crushed ice','Garlic cubes frozen','Paprika mix frozen','Veg keema','Gyoza (Veg)'
  ],
  'Vegetables': [
    'Chinese cabbage','Rosemerry','Ginger','Capcicum green','Capsicum red','Pineapple','Salad mix','Carrot Julian','Cabbage Julian','Scheut red decoration','Scheut green decoration','Edible flowers','Fresh Mint','Rasp berry','Blue berry','Straw berry','Black berry','Pomegranate (anar)','Watermelon','Lemons','Spring onion','Red onions','Potato','Tomato','Cucumber','Tuinker'
  ],
  'Meat Items': [],
  'Bar Inventory Items': [
    'Water Still','Water Sparkling','Everyday Soda','Cranberry Juice','Vedett IPA','Boon Geuze','Mort Subite','Slutte','Erdinger','Cobra','Kingfisher','Richie Lemon','Richie Orange','Richie Cola','Richie Cola zero','Richie Blood orange','Richie Ginger & Lemon','Aperol','Bombay Dry White','Bombay Sapphire','Copperhead','Gin Mare','Hendricks','Nona June','Monkey','Tequila','Elderflower','Medditranian','Raspberry','Indian','Ginger beer','Fentimans Rose','Onan Coffee','Onan Tea','Decaf coffee'
  ],
  'Wines': [
    'Care Fiano Salento','Care house white','Rioja red','House red','Bedoba','Forbidden Laurenze','Otto','Alturis (Pinot Grigio)','Busy bee','Barbaresco','House Bubbles','Prosecco','House Rose','Little fuck','Chardonnay CA66','Lapis Luna','Chablis','Cremant de bourgogne','Non alcoholic sparkling'
  ],
  'Miscellaneous items': [
    'Morel mushroom','Chocolate domes','Takeaway boxes and bags','Satey sticks'
  ]
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Nirvana Inventory App</title>
<style>
:root{--bg:#f4f6fa;--card:#fff;--text:#19212f;--muted:#617086;--primary:#2563eb;--border:#dbe3ef;}
*{box-sizing:border-box} body{margin:0;font-family:Inter,Arial,sans-serif;background:var(--bg);color:var(--text)}
.header{position:sticky;top:0;background:#111827;color:#fff;padding:14px 20px;font-weight:700;z-index:5}
.main{max-width:1100px;margin:20px auto;padding:0 16px 28px}
.panel{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;box-shadow:0 4px 14px rgba(17,24,39,.06)}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));align-items:end}
label{font-size:14px;font-weight:600} select,input{width:100%;margin-top:6px;padding:11px;border-radius:10px;border:1px solid var(--border);font:inherit}
.helper{color:var(--muted);font-size:13px;margin-top:8px}
.table-wrap{overflow:auto;margin-top:14px;border:1px solid var(--border);border-radius:12px}
table{width:100%;border-collapse:collapse;min-width:560px;background:#fff} th,td{padding:12px;border-bottom:1px solid var(--border);text-align:left}
th{background:#f8fbff;font-size:13px;text-transform:uppercase;letter-spacing:.03em}
.item-cell{display:flex;align-items:center;gap:10px}.badge{width:42px;height:42px;border-radius:10px;background:#eff6ff;color:#1d4ed8;display:grid;place-items:center;font-weight:700}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.btn{border:0;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
.primary{background:var(--primary);color:#fff}.ghost{background:#ecf1fb;color:#1e293b}
.status{margin-top:10px;font-size:14px}
@media (max-width:640px){.header{font-size:16px}.main{margin:14px auto}th,td{padding:10px}.badge{width:36px;height:36px}}
</style>
</head>
<body>
<header class="header">Nirvana Inventory App</header>
<main class="main">
<section class="panel">
<div class="grid">
<div><label for="category">Select category</label><select id="category"></select></div>
<div><label for="date">Inventory date</label><input id="date" type="date"/></div>
</div>
<p class="helper">Fill quantities and submit. The app creates an Excel file and attempts to email it to nirvanakitchenleuven@gmail.com.</p>
<div class="table-wrap"><table>
<thead><tr><th>Item pic</th><th>Item name</th><th>Quantity</th></tr></thead>
<tbody id="inventoryBody"></tbody>
</table></div>
<div class="actions">
<button id="submitBtn" class="btn primary">Submit Inventory</button>
<button id="clearBtn" class="btn ghost">Clear Quantities</button>
</div>
<p id="status" class="status"></p>
</section>
</main>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
const categories = ${JSON.stringify(categories)};
const emailTo = 'nirvanakitchenleuven@gmail.com';
// Optional: replace with your EmailJS keys before production deploy.
const emailJsConfig = {publicKey:'',serviceId:'',templateId:''};

const categoryEl = document.getElementById('category');
const dateEl = document.getElementById('date');
const bodyEl = document.getElementById('inventoryBody');
const statusEl = document.getElementById('status');

Object.keys(categories).forEach(name => {
  const option = document.createElement('option');
  option.value = name; option.textContent = name;
  categoryEl.appendChild(option);
});
dateEl.value = new Date().toISOString().split('T')[0];

function renderItems() {
  bodyEl.innerHTML = '';
  const selected = categories[categoryEl.value] || [];
  if (!selected.length) {
    bodyEl.innerHTML = '<tr><td>📦</td><td colspan="2">No items configured yet for this category.</td></tr>';
    return;
  }
  selected.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td><div class="item-cell"><div class="badge">'+(index+1)+'</div></div></td><td>'+item+'</td><td><input type="number" min="0" step="1" data-item="'+item.replaceAll('"','&quot;')+'" placeholder="0"/></td>';
    bodyEl.appendChild(tr);
  });
}

function collectRows() {
  return [...bodyEl.querySelectorAll('input[type="number"]')]
    .map(i => ({ item: i.dataset.item, quantity: Number(i.value || 0) }))
    .filter(r => r.quantity > 0);
}

async function submitInventory() {
  const category = categoryEl.value;
  const inventoryDate = dateEl.value;
  const rows = collectRows();
  if (!rows.length) {
    statusEl.textContent = 'Please enter at least one quantity greater than 0.';
    statusEl.style.color = '#b91c1c';
    return;
  }

  const exportRows = rows.map(r => ({ Category: category, Date: inventoryDate, Item: r.item, Quantity: r.quantity }));
  const ws = XLSX.utils.json_to_sheet(exportRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
  const fileName = 'nirvana-inventory-'+category.replaceAll(' ','-').toLowerCase()+'-'+inventoryDate+'.xlsx';
  XLSX.writeFile(wb, fileName);

  const summary = rows.map(r => '- '+r.item+': '+r.quantity).join('\n');
  try {
    if (emailJsConfig.publicKey && emailJsConfig.serviceId && emailJsConfig.templateId && window.emailjs) {
      emailjs.init({ publicKey: emailJsConfig.publicKey });
      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
        to_email: emailTo,
        subject: 'Nirvana Inventory - '+category+' ('+inventoryDate+')',
        message: 'Inventory summary:\n'+summary+'\n\nExcel file generated on device: '+fileName
      });
      statusEl.textContent = 'Inventory submitted and email sent successfully.';
      statusEl.style.color = '#166534';
      return;
    }

    const body = encodeURIComponent('Hi,\\n\\nPlease find the inventory details below. Attach the generated Excel file ('+fileName+') to this email before sending.\\n\\n'+summary);
    window.location.href = 'mailto:'+emailTo+'?subject='+encodeURIComponent('Nirvana Inventory - '+category+' ('+inventoryDate+')')+'&body='+body;
    statusEl.textContent = 'Excel generated. Your email app was opened to send it to '+emailTo+'.';
    statusEl.style.color = '#166534';
  } catch (error) {
    statusEl.textContent = 'Unable to send email automatically. Excel is generated; please email it manually to '+emailTo+'.';
    statusEl.style.color = '#b45309';
    console.error(error);
  }
}

categoryEl.addEventListener('change', renderItems);
document.getElementById('submitBtn').addEventListener('click', submitInventory);
document.getElementById('clearBtn').addEventListener('click', () => {
  bodyEl.querySelectorAll('input[type="number"]').forEach(i => i.value = '');
  statusEl.textContent = 'All quantities cleared.';
  statusEl.style.color = '#334155';
});
renderItems();
</script>
</body>
</html>`

export async function handler () {
  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: html
  }
}
