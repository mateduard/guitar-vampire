provider "azurerm" {
  features {}
  subscription_id = "dd0699b6-269a-485d-8285-d844f700b8b3"
}

# Create resource group
resource "azurerm_resource_group" "rg" {
  name     = "GResursa1"
  location = "North Europe"
}

# Create AKS cluster
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "clust1"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "clust1-dns"

  kubernetes_version  = "1.33.5"
  node_os_upgrade_channel = "None"
  sku_tier            = "Free"

  identity {
    type = "SystemAssigned"
  }

  # Network configuration
  network_profile {
    network_plugin    = "azure"
  }

  # Disable private cluster
  private_cluster_enabled = false

  # Node pool configuration (default node pool)
  default_node_pool {
    name       = "nodepool1"
    node_count = 1
    vm_size    = "Standard_D2ls_v5"
  }

  # Additional features like Azure Policy, Prometheus, Grafana, etc., are disabled by default
}