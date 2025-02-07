import { Router } from "vue-router";

export class NavigationService {
  constructor(private router: Router) {}

  public goToSearchPlatformSelection() {
    this.router.push("/from");
  }

  public goToSubmissionPlatformSelection() {
    this.router.push("/to");
  }

  public navigateToIntegrationPage() {
    this.router.push("/integration");
  }
}
