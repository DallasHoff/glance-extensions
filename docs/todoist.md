# Glance Todoist Extension

An extension for displaying [Todoist](https://todoist.com/) tasks in [Glance](https://github.com/glanceapp/glance) dashboards

```yaml
- type: extension
  title: To Do
  title-url: https://app.todoist.com/
  cache: 1s
  url: http://localhost:8080/todoist
  allow-potentially-dangerous-html: true
  parameters:
    token: egn0tactva1lyarea1t0k3n
    filter: today | tomorrow | overdue
```

## Parameters

| Name   | Type   | Required | Default |
| ------ | ------ | -------- | ------- |
| token  | string | yes      |         |
| filter | string | no       | today   |

### `token`

Your [Todoist API token](https://todoist.com/help/articles/find-your-api-token-Jpzx9IIlB). Can alternatively be passed as an environment variable named `TODOIST_TOKEN`.

### `filter`

A [Todoist filter](https://todoist.com/help/articles/introduction-to-filters-V98wIH) to specify which tasks to fetch and display in the widget.
