import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { addPage } from "../../pages/add-flow/add-page";
import { topologyPage, topologySidePane } from "../../pages/topology-page";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";
import { resourceTypes } from "../../constants/add";

let gitUrl = "https://github.com/sclorg/nodejs-ex.git";

Given("user has created a workload named {string}", (componentName: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload(gitUrl, componentName);
  topologyPage.verifyTopologyPage();
});

Given("user has created a workload with application name {string}", (appName: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload(gitUrl, "nodejs-ex-git", resourceTypes.Deployment, appName);
  topologyPage.verifyTopologyPage();
});

When("user clicks on an applicaton grouping {string}", (appName: string) => {
  topologyPage.appNode(appName).should("be.visible").click({ force: true });
});

When(
  "user right clicks on Application {string} to open context menu",
  (appName: string) => {
    topologyPage.appNode(appName).trigger("contextmenu", { force: true });
  }
);

Then("user can see application sidebar", () => {
  topologySidePane.verify();
});

Then(
  "user is able to see workload {string} under resources tab in the sidebar",
  (workloadName: string) => {
    topologySidePane.verifyWorkloadInAppSideBar(workloadName);
  }
);

Then(
  "user can see Add to Application and Delete Application in the Action menu",
  () => {
    cy.byLegacyTestID("actions-menu-button").click();
    topologySidePane.verifyActions("Add to Application", "Delete Application");
  }
);

Then("user can view Add to Application and Delete Application options", () => {
  topologyPage.verifyContextMenuOptions(
    "Add to Application",
    "Delete Application"
  );
});
