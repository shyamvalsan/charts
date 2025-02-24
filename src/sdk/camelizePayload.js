const camelizeResult = result => {
  if (Array.isArray(result)) return result

  const { labels, data, post_aggregated_data } = result

  return { labels, data, postAggregatedData: post_aggregated_data }
}

export default payload => {
  const {
    update_every,
    view_update_every,
    first_entry,
    last_entry,
    dimension_names,
    dimension_ids,
    latest_values,
    view_latest_values,
    result,
    all_dimensions,
    all_chart_labels,
    ...rest
  } = payload

  return {
    updateEvery: update_every,
    viewUpdateEvery: view_update_every,
    firstEntry: first_entry,
    lastEntry: last_entry,
    dimensionNames: dimension_names,
    dimensionIds: dimension_ids,
    latestValues: latest_values,
    viewLatestValues: view_latest_values,
    result: camelizeResult(result),
    metadata: {
      ...(!!all_dimensions && { fullyLoaded: true }),
      ...(!!all_dimensions && { dimensions: all_dimensions }),
      ...(!!all_chart_labels && { chartLabels: all_chart_labels }),
    },
    ...rest,
  }
}
