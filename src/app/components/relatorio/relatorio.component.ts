import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '../../service/productservice';
import { Product } from '../../domain/product';
import { FormsModule } from '@angular/forms';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, FormsModule],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})

export class RelatorioComponent implements OnInit {
  products!: Product[];

  cols!: Column[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.productService.getProducts().then((data) => {
          this.products = data;
      });

      this.cols = [
          { field: 'code', header: 'Code' },
          { field: 'name', header: 'Name' },
          { field: 'category', header: 'Category' },
          { field: 'quantity', header: 'Quantity' },
          { field: 'inventoryStatus', header: 'Status' },
          { field: 'rating', header: 'Rating' }
      ];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
      return;
  }
}
