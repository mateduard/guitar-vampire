provider "azurerm" {
  features {}
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

  sku_tier            = "Free"

  # Authentication with local accounts and RBAC

  # Network configuration
  network_profile {
    network_plugin    = "azure"
    network_policy    = "none"
  }

  # Disable private cluster
  private_cluster_enabled = false

  # No fleet manager, AZ, or other advanced options specified
  # Node pool configuration (default node pool)
  default_node_pool {
    name       = "nodepool1"
    node_count = 1
    vm_size    = "Standard_D2ls_v5" # default size, can be customized
  }

  # Additional features like Azure Policy, Prometheus, Grafana, etc., are disabled by default
}
