import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import path from 'path';
import { HomeComponent } from './components/home/home.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '', component: SidebarComponent,
        children: [
            {path: 'home',component: HomeComponent},
            {path: 'relatorio-diarias',component: RelatorioComponent},
        ]
    }
];
