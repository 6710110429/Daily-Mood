# Bucket สำหรับสำรองข้อมูลจากระบบ Daily Mood Flower

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = "your-gcp-project-id"
  region  = "asia-southeast1"
}
resource "google_storage_bucket" "backup_bucket" {
  name     = "daily-mood-backup-bucket"
  location = "ASIA"

  uniform_bucket_level_access = true
}
