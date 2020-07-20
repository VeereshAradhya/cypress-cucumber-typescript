Feature: Workspaces
    As a user I want to add or remove secrets details to pipeline

Background:
    Given openshift cluster is installed with pipeline operator
    And user is at the project namespace "aut-workspaces-demo" in dev perspecitve


@regression, @pipeline-smoke, @manual
Scenario: Create the pipeline with workspace : P-012-TC01


@regression
Scenario: Workspaces section in start modal : P-012-TC02


@regression
Scenario: Add volume type to the workspaces : P-012-TC03


@regression
Scenario: Start the pipeline with workspace : P-012-TC04