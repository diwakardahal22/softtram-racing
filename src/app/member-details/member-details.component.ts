import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    team: '',
    status: '',
  };
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  id!: string;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.appService.getMemberById(this.id).subscribe(d => this.memberModel = d);
    }
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
  }

  ngOnChanges() { }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.id) {
      this.appService.updateMember(this.id, this.memberModel).subscribe();
    } else {
      this.appService.addMember(this.memberModel).subscribe();
    }
    this.router.navigate(['/members']);
  }
}
