import {Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Pausas } from '../../interfaces/pausas';
import { DividerModule } from 'primeng/divider';
import { PausasDTO } from '../../interfaces/pausasDTO';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, DividerModule, NgFor, ScrollPanelModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public secondsLeft = 0;
  public selectButton = true;
  public selectButtonPause = false;
  public selectButtonDespause = false;
  public selectButtonEncerrar = false;
  
  public pausaDTO: PausasDTO = {
    inicioPausa: '', 
    fimPausa: ''   
  }
  public pausasDTO: PausasDTO[] = [];

  public pausa: Pausas = {
    inicioPausa: new Date(), 
    fimPausa: new Date()   
  }

  public pausas: Pausas[] = [];

  public timer: any = {};


  public ngOnInit(): void {
    this.secondsLeft = this.getSecondsUntil();
  }

  public formatTimeHora() {
    const hours = Math.floor(this.secondsLeft / 3600);

    return `${hours < 10 ? '0' : ''}${hours}`;
  }

  public formatTimeMinuto() {

    const minutes = Math.floor((this.secondsLeft % 3600) / 60);

    return `${minutes < 10 ? '0' : ''}${minutes}`;
  }

  public formatTimeSegundo() {
    const seconds = this.secondsLeft % 60;
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  }

  public start() {
    this.pausas = []
    this.pausasDTO = []
    this.selectButton = false
    this.selectButtonPause = true
    this.selectButtonDespause = false
    this.selectButtonEncerrar = true
    this.timer = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--
      } else {
        clearInterval(this.timer);
        this.timer = {};
      }
    }, 1000);
  }

  public pause() {
    this.selectButton = false
    this.selectButtonPause = false
    this.selectButtonDespause = true
    this.selectButtonEncerrar = false
    this.pausa.inicioPausa = new Date
    this.pausaDTO.inicioPausa = this.formatarHoraCompleta(this.pausa.inicioPausa)
    clearInterval(this.timer);
    this.timer = {};
  }

  public despausar() {
    this.selectButton = false
    this.selectButtonPause = true
    this.selectButtonDespause = false
    this.selectButtonEncerrar = true
    this.pausa.fimPausa = new Date
    this.pausas.push(this.pausa)
    this.pausaDTO.fimPausa = this.formatarHoraCompleta(this.pausa.fimPausa)
    this.pausasDTO.push(this.pausaDTO)
    this.timer = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--
      } else {
        clearInterval(this.timer);
        this.timer = {};
      }
    }, 1000);
  }

  public encerrar() {
    this.selectButton = true
    this.selectButtonPause = false
    this.selectButtonDespause = false
    this.selectButtonEncerrar = false

    clearInterval(this.timer);
    this.timer = {};
    this.secondsLeft = this.getSecondsUntil();
  }

  public getSecondsUntil() {
    const now: any = new Date();
    const targetTime: any = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    return Math.floor((targetTime - now) / 1000);
  }

  public formatarHoraCompleta(date: Date): string {
    const horas = this.padLeft(date.getHours().toString(), '0', 2);
    const minutos = this.padLeft(date.getMinutes().toString(), '0', 2);
    const segundos = this.padLeft(date.getSeconds().toString(), '0', 2);
    return `${horas}:${minutos}:${segundos}`;
  }
  
  public padLeft(value: string, padChar: string, length: number): string {
    return (Array(length + 1).join(padChar) + value).slice(-length);
  }
  
}
