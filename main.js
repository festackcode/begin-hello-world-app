import 'zone.js';
import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const CATEGORIES = {
  'Vanzon items': [
    'Indian summer mix juice','Pulco lemon juice','Almonds','Vinegar','Dried orange','Rose petals','Chef natural Chick broth','Chili sauce','White chcolate','Nutella','Lemon sirop','Curry Ketchup (6 liters)','Bar cookies (Desire)','Frying oil (15L VanZon Chef)','Coconut milk (Golden turtle 1 litre)','GOLDEN TURTLE PANEERMIX TEMPURA','Honey 1kg','Milk Inox full cream (12 x 1 L)','Cinnamon sticks for Bar','Kimchi sauce','Maggi aroma','Corn Flour','Mayonnaise 3L','Milk packs for coffee','Sugar strips for coffee','Olive oil (Delizio 1L)','Oyster sauce','Paneermix Panco','Pesto','Edible spoon','Plums','Coconut powder','Pista','Walnut (1/4 1,15KG)','Redwine vinegar','Vegan cream (1L)','Sugar (1kg x 10)','Tabasco sauce','Pinenuts','Kishmish','Frozen tortilla (25cm 12 st)','Textura Xantana','Tomato puree 4.5kg','Truffel oil','Vegan mayo','Sunflower oil (3kg)','Salt (1kg x 10)','Hand towel for bathroom','Gloves','Hand wash','Bread basket paper','Toilet paper (8x8)','Kitchen roll','Table tissues','Table clean spray (pulsar)','Aluminium foil','Clean film wrap','Blue bags (PMD)','Dishwashing liquid','Cloth washing liquid','Onion cubes (1kg)','Vegan yoghurt (Alpro)','Burrata (Galbani)','Cream 2L (Debic)','Egg','Griek Yoghurt (1kg)','Inox mango lassi yoghurt (1L)','Selecta cheese (400g)','Mozzarella (Galbani)','Parmesan cheese','Philadelphia cheese','Pineapple juice','Avocado frozen','Mushroom frozen','Crushed ice','Garlic cubes frozen','Paprika mix frozen','Veg keema','Gyoza (Veg)'
  ],
  'Vegetables': ['Chinese cabbage','Rosemerry','Ginger','Capcicum green','Capsicum red','Pineapple','Salad mix','Carrot Julian','Cabbage Julian','Scheut red decoration','Scheut green decoration','Edible flowers','Fresh Mint','Rasp berry','Blue berry','Straw berry','Black berry','Pomegranate (anar)','Watermelon','Lemons','Spring onion','Red onions','Potato','Tomato','Cucumber','Tuinker'],
  'Meat Items': [],
  'Bar Inventory Items': ['Water Still','Water Sparkling','Everyday Soda','Cranberry Juice','Vedett IPA','Boon Geuze','Mort Subite','Slutte','Erdinger','Cobra','Kingfisher','Richie Lemon','Richie Orange','Richie Cola','Richie Cola zero','Richie Blood orange','Richie Ginger & Lemon','Aperol','Bombay Dry White','Bombay Sapphire','Copperhead','Gin Mare','Hendricks','Nona June','Monkey','Tequila','Elderflower','Medditranian','Raspberry','Indian','Ginger beer','Fentimans Rose','Onan Coffee','Onan Tea','Decaf coffee'],
  'Wines': ['Care Fiano Salento','Care house white','Rioja red','House red','Bedoba','Forbidden Laurenze','Otto','Alturis (Pinot Grigio)','Busy bee','Barbaresco','House Bubbles','Prosecco','House Rose','Little fuck','Chardonnay CA66','Lapis Luna','Chablis','Cremant de bourgogne','Non alcoholic sparkling'],
  'Miscellaneous items': ['Morel mushroom','Chocolate domes','Takeaway boxes and bags','Satey sticks']
};

const emailTo = 'nirvanakitchenleuven@gmail.com';
const emailJsConfig = { publicKey: '', serviceId: '', templateId: '' };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <header class="header">Nirvana Inventory App</header>
  <main class="main">
    <section class="panel">
      <div class="grid">
        <div>
          <label for="category">Select category</label>
          <select id="category" [(ngModel)]="selectedCategory">
            <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
          </select>
        </div>
        <div>
          <label for="inventoryDate">Inventory date</label>
          <input id="inventoryDate" type="date" [(ngModel)]="inventoryDate" />
        </div>
      </div>
      <p class="helper">Fill quantities and submit. The app creates an Excel file and attempts to email it to nirvanakitchenleuven@gmail.com.</p>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Item pic</th><th>Item name</th><th>Quantity</th></tr>
          </thead>
          <tbody>
            <tr *ngIf="activeItems.length === 0">
              <td>📦</td>
              <td colspan="2">No items configured yet for this category.</td>
            </tr>
            <tr *ngFor="let item of activeItems; index as i">
              <td><div class="badge">{{ i + 1 }}</div></td>
              <td>{{ item }}</td>
              <td><input type="number" min="0" step="1" [(ngModel)]="quantities[item]" placeholder="0" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="actions">
        <button class="btn primary" (click)="submitInventory()">Submit Inventory</button>
        <button class="btn ghost" (click)="clearQuantities()">Clear Quantities</button>
      </div>
      <p class="status" [class.error]="statusType==='error'" [class.warn]="statusType==='warn'" [class.success]="statusType==='success'">{{ statusMessage }}</p>
    </section>
  </main>
  `
})
class AppComponent {
  categories = Object.keys(CATEGORIES);
  selectedCategory = this.categories[0];
  inventoryDate = new Date().toISOString().split('T')[0];
  quantities = {};
  statusMessage = '';
  statusType = '';

  get activeItems() {
    return CATEGORIES[this.selectedCategory] || [];
  }

  clearQuantities() {
    this.quantities = {};
    this.statusType = 'success';
    this.statusMessage = 'All quantities cleared.';
  }

  async submitInventory() {
    const rows = this.activeItems
      .map((item) => ({ item, quantity: Number(this.quantities[item] || 0) }))
      .filter((entry) => entry.quantity > 0);

    if (!rows.length) {
      this.statusType = 'error';
      this.statusMessage = 'Please enter at least one quantity greater than 0.';
      return;
    }

    const exportRows = rows.map((entry) => ({
      Category: this.selectedCategory,
      Date: this.inventoryDate,
      Item: entry.item,
      Quantity: entry.quantity
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    const fileName = `nirvana-inventory-${this.selectedCategory.replaceAll(' ', '-').toLowerCase()}-${this.inventoryDate}.xlsx`;
    XLSX.writeFile(wb, fileName);

    const summary = rows.map((entry) => `- ${entry.item}: ${entry.quantity}`).join('\n');

    try {
      if (emailJsConfig.publicKey && emailJsConfig.serviceId && emailJsConfig.templateId && window.emailjs) {
        window.emailjs.init({ publicKey: emailJsConfig.publicKey });
        await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
          to_email: emailTo,
          subject: `Nirvana Inventory - ${this.selectedCategory} (${this.inventoryDate})`,
          message: `Inventory summary:\n${summary}\n\nExcel file generated on device: ${fileName}`
        });
        this.statusType = 'success';
        this.statusMessage = 'Inventory submitted and email sent successfully.';
        return;
      }

      const body = encodeURIComponent(
        `Hi,\n\nPlease find the inventory details below. Attach the generated Excel file (${fileName}) to this email before sending.\n\n${summary}`
      );
      window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(`Nirvana Inventory - ${this.selectedCategory} (${this.inventoryDate})`)}&body=${body}`;
      this.statusType = 'success';
      this.statusMessage = `Excel generated. Your email app was opened to send it to ${emailTo}.`;
    } catch (_error) {
      this.statusType = 'warn';
      this.statusMessage = `Unable to send email automatically. Excel is generated; please email it manually to ${emailTo}.`;
    }
  }
}

bootstrapApplication(AppComponent);
