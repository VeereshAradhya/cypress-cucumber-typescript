import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { addPage } from "../../pages/add-flow/add-page";
import { addOptions, buildConfigOptions } from "../../constants/add";
import {
  topologyPage,
  topologySidePane,
  addHealthChecksPage,
} from "../../pages/topology-page";

Given("user is at Import from git page", () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

When("user enters Git Repo url as {string}", (gitUrl: string) => {
  addPage.enterGitUrl(gitUrl);
  addPage.verifyValidatedMessage();
  cy.get('body').then(($el) => {
    if ($el.find('[aria-label="Success Alert"]').length) {
      cy.log('BUilder image detected');
    } else {
      addPage.enterGitUrl(gitUrl);
      addPage.verifyBuilderImageDetectedMessage();
    }
  });
});

Then("git url gets Validated", () => {
  addPage.verifyValidatedMessage();
});

Then("builder image is detetced", () => {
  addPage.verifyBuilderImageDetectedMessage();
});

Then("builder image version drop down is displayed", () => {
  addPage.verifyBuilderImageVersion();
});

Then("Application name displays as {string}", (appName: string) => {
  addPage.veirfyAppName(appName);
});

Then("Name displays as {string}", (nodeName: string) => {
  addPage.veirfyNodeName(nodeName);
});

When("user selects resource type as {string}", (resourceType: string) => {
  addPage.selectResource(resourceType);
});

Then(
  "created workload {string} is linked to existing application {string}",
  (workloadName: string, appName: string) => {
    topologyPage.appNode(appName).click({ force: true });
    topologySidePane.verifyResource(workloadName);
  }
);

When("user enters Application name as {string}", (appName: string) => {
  addPage.enterAppName(appName);
});

When("user enters Name as {string}", (name: string) => {
  addPage.enterComponentName(name);
});

When(
  "user unselects the advanced option Create a route to the application",
  () => {
    addPage.unselectRoute();
  }
);

When("user enters name as {string} in General section", (name: string) => {
  addPage.enterComponentName(name);
});

When(
  "user clicks {string} link in Advanced Options section",
  (linkName: string) => {
    cy.byButtonText(linkName).click();
  }
);

When("user enters Hostname as {string}", (hostName: string) => {
  addPage.enterRoutingHostName(hostName);
});

When("user enters Path as {string}", (path: string) => {
  addPage.eneterRoutingPath(path);
});

When("select default Target Port", () => {
  addPage.selectTargetPortForRouting();
});

When("user enters name as {string} in General section", (name: string) => {
  addPage.enterComponentName(name);
});

When(
  "user unselects Configure a webhook build trigger checkbox in build configuration section",
  () => {
    addPage.uncheckBuildConfigOption(buildConfigOptions.webhookBuildTrigger);
  }
);

When(
  "user unselects Automatically build a new image when the builder image changes checkbox in build configuration section",
  () => {
    addPage.uncheckBuildConfigOption(buildConfigOptions.automaticBuildImage);
  }
);

When(
  "user unselects Launch the first build when the build configuration is created checkbox in build configuration section",
  () => {
    addPage.uncheckBuildConfigOption(
      buildConfigOptions.launchBuildOnCreatingBuildConfig
    );
  }
);

When(
  "user enters Name as {string} in Environment Variables section",
  (envName: string) => {
    addPage.enterBuildConfigEnvName(envName);
  }
);

When(
  "user enters Value as {string} in Environment Variables section",
  (envValue: string) => {
    addPage.enterBuildConfigEnvValue(envValue);
  }
);

Then("build does not get started for {string}", (nodeName: string) => {
  topologyPage.componentNode(nodeName).click({ force: true });
  topologySidePane.verify();
  cy.get("div.build-overview li.list-group-item > span").should(
    "contain.text",
    "No Builds found for this Build Config."
  );
});

When(
  "verify Auto deploy when new image is available checkbox is seleceted",
  () => {
    addPage.verifyDeploymentOptionIsChecked();
  }
);

When(
  "user enters Name as {string} in Environment Variables Runtime only section",
  (envName: string) => {
    addPage.enterDeploymentEnvName(envName);
  }
);

When(
  "user enters Value as {string} in Environment Variables Runtime only section",
  (envValue: string) => {
    addPage.enterDeploymentEnvValue(envValue);
  }
);

When(
  "user enters CPU Request as {string} in CPU section",
  (cpuRequestValue: string) => {
    addPage.enterResourceLimitCPURequest(cpuRequestValue);
  }
);

When(
  "user enters CPU Limits as {string} in CPU section",
  (cpuLimitValue: string) => {
    addPage.enterResourceLimitCPULimit(cpuLimitValue);
  }
);

When(
  "user enters Memory Request as {string} in Memory section",
  (memoryRequestValue: string) => {
    addPage.enterResourceLimitMemoryRequest(memoryRequestValue);
  }
);

When(
  "user enters Memory Limit as {string} in Memory section",
  (memoryLimitValue: string) => {
    addPage.enterResourceLimitMemoryLimit(memoryLimitValue);
  }
);

When(
  "user enters number of replicas as {string} in Replicas section",
  (replicaCount: string) => {
    addPage.enterScalingReplicaCount(replicaCount);
  }
);

When("user fills the Readiness Probe details", () => {
  addHealthChecksPage.addReadinessProbe();
});

When("user fills the Liveness Probe details", () => {
  addHealthChecksPage.addLivenessProbe();
});

When("user fills the Startup Probe details", () => {
  addHealthChecksPage.addStartupProbe();
});

When("user enters label as {string}", (labelName: string) => {
  addPage.enterLabels(labelName);
});

Then("public url is not created for node {string}", (nodeName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
  topologyPage.componentNode(nodeName).click({ force: true });
  topologySidePane.selectTab("Resources");
  topologySidePane.verifySection("Routes").should("be.visible");
  cy.get('[role="dialog"] h2')
    .contains("Routes")
    .next("span")
    .should("contain.text", "No Routes found for this resource.");
});

Then(
  "the route of application {string} contains {string}",
  (nodeName: string, routeName: string) => {
    topologyPage.verifyWorkloadInTopologyPage(nodeName);
    topologyPage.componentNode(nodeName).click({ force: true });
    topologySidePane.selectTab("Resources");
    topologySidePane.verifySection("Routes").should("be.visible");
    cy.get('[role="dialog"] h2')
      .contains("Routes")
      .next("span")
      .should("contain.text", routeName);
  }
);

Then(
  "verify the label {string} in side bar of application node {string}",
  (labelName: string, nodeName: string) => {
    topologyPage.componentNode(nodeName).click({ force: true });
    topologySidePane.selectTab("Details");
    topologySidePane.verifyLabel(labelName);
  }
);
