# Glance Todoist Extension

An extension for displaying Todoist tasks in [Glance](https://github.com/glanceapp/glance) dashboards

## Environment Variables

| Name          | Type   | Required | Default |
| ------------- | ------ | -------- | ------- |
| TODOIST_TOKEN | string | yes      |         |
| PORT          | number | no       | 8080    |

### `TODOIST_TOKEN`

Your [Todoist API token](https://todoist.com/help/articles/find-your-api-token-Jpzx9IIlB).

### `PORT`

The port from which to serve this extension.

## Properties

| Name   | Type   | Required | Default |
| ------ | ------ | -------- | ------- |
| filter | string | no       | today   |

### `filter`

A [Todoist filter](https://todoist.com/help/articles/introduction-to-filters-V98wIH) to specify which tasks to fetch and display in the widget.
