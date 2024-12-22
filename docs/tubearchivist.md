# Glance TubeArchivist Extension

An extension for displaying [TubeArchivist](https://www.tubearchivist.com/) videos in [Glance](https://github.com/glanceapp/glance) dashboards

```yaml
- type: extension
  title: TubeArchivist
  url: http://localhost:8080/tubearchivist
  allow-potentially-dangerous-html: true
  parameters:
    host: http://localhost:8000
    token: egn0tactva1lyarea1t0k3n
```

## Parameters

| Name  | Type   | Required | Default |
| ----- | ------ | -------- | ------- |
| host  | string | yes      |         |
| token | string | yes      |         |

### `host`

The URL for the host that serves your TubeArchivist instance. Can alternatively be passed as an environment variable named `TA_HOST`.

### `token`

Your TubeArchivist API token, obtained from the settings page of your TubeArchivist instance. Can alternatively be passed as an environment variable named `TA_TOKEN`.
