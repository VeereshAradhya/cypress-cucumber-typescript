import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { topologyPage, topologyObj } from "../../pages/topology-page";

When("user clicks on workload to open sidebar", () => {
  // TODO: implement step
});

When("user clicks on Action menu", () => {
  // TODO: implement step
});

When("user clicks delete workload", () => {
  // TODO: implement step
});

When("user sees {string} modal box to open", (alertTitle: string) => {
  cy.alertTitleShouldContain(alertTitle);
});

When(
  "user checks Delete dependent objects of this resource to be checked",
  () => {
    cy.get('form input[type="checkbox"]').should("be.checked");
  }
);

When("user clicks on {string}", (buttonName: string) => {
  cy.byTestID("confirm-action").contains(buttonName).click();
});

When("user right clicks on the node {string}", (nodeName: string) => {
  cy.get("g.odc-base-node__label")
    .should("be.visible")
    .contains(nodeName)
    .trigger("contextmenu", { force: true });
});

When("user selects {string} from the context menu", (option: string) => {
  cy.byTestActionID(option).click();
});

Then("workload {string} disappeared from topology", (workloadName: string) => {
  cy.get(topologyObj.switcher).click();
  topologyPage.search(workloadName);
  cy.get("div.is-filtered").should("not.be.visible");
});
