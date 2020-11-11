import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";
import { CredenciaisDTO } from "../../models/credenciais.dto";
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: null,
    senha: null,
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {}

  login() {
    this.auth.authenticated(this.creds).subscribe(response => {
      this.auth.sucessfullLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CategoriasPage');
    }),
    error => {}
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
}
