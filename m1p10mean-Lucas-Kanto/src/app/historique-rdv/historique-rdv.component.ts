import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-historique-rdv',
  templateUrl: './historique-rdv.component.html',
  styleUrl: './historique-rdv.component.css'
})
export class HistoriqueRDVComponent implements OnInit{

  rendezvous: any[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {}

  ngOnInit() {
    this.getListHistoriqueRendezvous();
  }
  getListHistoriqueRendezvous() {
    const client_id = this.cookieService.get('id');

    if (client_id) {
      const url = environment.baseUrl+`/rendezvous/lesrendezvous/${client_id}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          // La réponse contient la liste des rendezvous
          if (response.status && response.rendezvousList) {
            this.rendezvous = response.rendezvousList;
            console.log('Liste des rendezvous :', this.rendezvous);
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des rendezvous :', error);
        }
      );
    } else {
      console.error('client_id non trouvé dans le cookie.');
    }
  }


}
