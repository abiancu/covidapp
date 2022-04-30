param webAppName string = uniqueString(resourceGroup().id)
param appServicePlan string = '${webAppName}-asp'
param location string = resourceGroup().location


var appServicePlanName = toLower('${webAppName}-${appServicePlan}')
var websiteName = toLower('${webAppName}')

resource serverfarms_nodejs_app_asp_name_resource 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: appServicePlanName
  location: location
  tags: {
    nodeapp: ''
  }
  sku: {
    name: 'F1'
    tier: 'Free'
    size: 'B1'
    family: 'F'
    capacity: 1
  }
  kind: 'linux'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    freeOfferExpirationTime: '2022-05-06T03:03:25.86'
    reserved: true
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}


resource sites_covidtracker3592_name_resource 'Microsoft.Web/sites@2021-03-01' = {
  name: websiteName
  location: location
  tags: {
    nodeapp: ''
  }
  kind: 'app,linux'
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${webAppName}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${webAppName}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverfarms_nodejs_app_asp_name_resource.id
    reserved: true
    isXenon: false
    hyperV: false
    siteConfig: {
      numberOfWorkers: 1
      linuxFxVersion: 'NODE|10.10'
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: true
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: true
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '0A5D809FDAD12CC01C10F218633D8E3D71A9BC9833246F24130EBAA9A407AE40'
    containerSize: 0
    dailyMemoryTimeQuota: 0
    httpsOnly: false
    redundancyMode: 'None'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

