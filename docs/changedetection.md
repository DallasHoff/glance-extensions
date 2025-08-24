# Glance Change Detection Text Extension

An extension for displaying the text from a [Change Detection](https://changedetection.io/) watch in [Glance](https://github.com/glanceapp/glance) dashboards

```yaml
- type: extension
  title: Change Detection
  url: http://localhost:8080/changedetection
  allow-potentially-dangerous-html: true
  parameters:
    host: http://localhost:8000
    token: egn0tactva1lyarea1t0k3n
    watchId: 00000000-0000-0000-0000-000000000000
```

## Parameters

| Name    | Type   | Required | Default |
| ------- | ------ | -------- | ------- |
| host    | string | yes      |         |
| token   | string | yes      |         |
| watchId | string | yes      |         |

### `host`

The URL for the host that serves your Change Detection instance. Can alternatively be passed as an environment variable named `CHANGE_DETECTION_HOST`.

### `token`

Your Change Detection API token, obtained from the settings page of your Change Detection instance. Can alternatively be passed as an environment variable named `CHANGE_DETECTION_TOKEN`.

### `watchId`

The ID of the watch for which to fetch the latest scaped text. This can be taken from the URL of the watch's page in Change Detection.
