import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  perspective,
  projectNameSpace as project,
  naviagteTo,
} from "../../pages/app";
import { operatorsPage } from "../../pages/operators-page";
import {
  switchPerspective,
  devNavigationMenu as menu,
  devNavigationMenu,
} from "../../constants/global";
import { addPage } from "../../pages/add-flow/add-page";
import { addOptions } from "../../constants/add";

Given("user is at administrator perspective", () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective("Administrator");
});

Given("user has installed knative Apache camel operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  operatorsPage.navigateToInstalloperatorsPage();
  operatorsPage.verifyInstalledOperator("Knative");
});

Given("user is at developer perspective", () => {
  perspective.switchTo(switchPerspective.Developer);
  perspective.skipGuidedTours();
  perspective.verifyPerspective("Developer");
});

Given("user has installed knative apache camel operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  operatorsPage.navigateToInstalloperatorsPage();
  operatorsPage.verifyInstalledOperator("knativecamel");
});

Given("user has installed OpenShift Virtualization operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  operatorsPage.navigateToInstalloperatorsPage();
  operatorsPage.verifyInstalledOperator("OpenShift Virtualization operator");
});

Given("user has installed OpenShift Serverless and eventing operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  operatorsPage.verifyOperatorInNavigationMenu("Serverless");
});

Given("user has installed OpenShift Pipelines operator", () => {
  perspective.switchTo(switchPerspective.Developer);
  perspective.skipGuidedTours();
  perspective.verifyPerspective("Developer");
  cy.get("#page-sidebar").then(($navMenu) => {
    if ($navMenu.find('[data-test-id="pipeline-header"]').length) {
      cy.log("pipeline operator is installed");
    }
  });
});

Given("user has selected namespace {string}", (projectName: string) => {
  perspective.switchTo(switchPerspective.Developer);
  perspective.skipGuidedTours();
  let d = new Date();
  let timestamp = d.getTime();
  project.createNewProject(`${projectName}-${timestamp}-ns`);
  cy.log(`User has selected namespace "${projectName}-${timestamp}-ns"`);
});

Given("user is at namespace {string}", (projectName: string) => {
  perspective.switchTo(switchPerspective.Developer);
  perspective.skipGuidedTours();
  project.selectOrCreateProject(projectName);
});

Given("user has installed OpenShift Serverless Operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective("Administrator");
  operatorsPage.verifyOperatorInNavigationMenu("Serverless");
});

Given("user has installed ElasticSearch Operator provided by Red Hat", () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective("Administrator");
  operatorsPage.verifyInstalledOperator("ElasticsearchOperator");
});

Given("user has installed Red Hat OpenShift Jaeger Operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective("Administrator");
  operatorsPage.verifyInstalledOperator("Jaeger");
});

Given("user has installed Kiali Operator provided by Red Hat", () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective("Administrator");
  operatorsPage.verifyInstalledOperator("Kiali");
});

Given("user has installed Red Hat OpenShift Service Mesh Operator", () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective("Administrator");
  operatorsPage.verifyInstalledOperator("ServiceMesh");
});

Given("user is at Add page", () => {
  naviagteTo(devNavigationMenu.Add);
});

Given("user is at Developer Catlog page", () => {
  addPage.selectCardFromOptions(addOptions.DeveloperCatalog);
});

Given("user is at pipelines page", () => {
  naviagteTo(menu.Pipelines);
});

Given("user is at Monitoring page", () => {
  naviagteTo(menu.Monitoring);
});

When("user switches to developer perspective", () => {
  perspective.switchTo(switchPerspective.Developer);
  perspective.skipGuidedTours();
});

When("user navigates to Topology page", () => {
  naviagteTo(devNavigationMenu.Topology);
});

When("user navigates to Add page", () => {
  naviagteTo(devNavigationMenu.Add);
});

When("user clicks Create button on Add page", () => {
  addPage.clickCreate();
});

When("user selects {string} option from kebab menu", (option: string) => {
  cy.byTestActionID(option).click();
});

When("user selects {string} option from Actions menu", (option: string) => {
  cy.byTestActionID(option).click();
});

Then("modal with {string} appears", (header: string) => {
  cy.alertTitleShouldContain(header);
});

Then("user will be redirected to Add page", () => {
  cy.get("h1.ocs-page-layout__title").should("have.text", "Add");
});

Then("user will be redirected to Pipelines page", () => {
  cy.pageTitleShouldContain("Pipelines");
});
