import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { CategoriaService } from "../../services/domain/categoria.service";

@IonicPage()
@Component({
  selector: "page-categorias",
  templateUrl: "categorias.html",
})
export class CategoriasPage {
  bucketUrl = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
  ) {}

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {}
    );
  }
}
