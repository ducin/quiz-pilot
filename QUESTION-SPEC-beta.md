# PromQL Questions With Documentation Links

This document outlines the structure of the PromQL questions JSON file that includes the original 20 questions plus the 80 additional questions I've created, all enhanced with documentation links.

## Structure Overview

Each question in the JSON array follows this structure:

```json
{
  "id": "unique-uuid",
  "text": "The question text",
  "type": "SINGLE_CHOICE|MULTIPLE_CHOICE|CODE_COMPLETION",
  "options": [  // For SINGLE_CHOICE or MULTIPLE_CHOICE
    {
      "id": "option-uuid-1",
      "label": "Option text 1"
    },
    // More options...
  ],
  "template": "`metric_name[____]`",  // For CODE_COMPLETION
  "gaps": ["5m"],  // For CODE_COMPLETION
  "correctAnswers": ["option-uuid-1"],  // IDs of correct options or gap values
  "explanation": "Explanation of the answer",
  "difficulty": "BASIC|ADVANCED|EXPERT",
  "links": [
    {
      "description": "Documentation Title",
      "url": "https://prometheus.io/docs/path/to/documentation"
    },
    // More documentation links...
  ]
}
```

## Documentation Links

I've added relevant documentation links to each question by analyzing:

1. The question text
2. Code templates (for CODE_COMPLETION questions)
3. Explanation text

Links point to the official Prometheus documentation, including:

- [Querying Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [PromQL Functions](https://prometheus.io/docs/prometheus/latest/querying/functions/)
- [PromQL Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/)
- [Metric Types](https://prometheus.io/docs/concepts/metric_types/)
- [Histograms and Summaries](https://prometheus.io/docs/practices/histograms/)
- [Recording Rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/)
- Blog posts for newer features like the [@ Modifier](https://prometheus.io/blog/2021/02/18/introducing-the-@-modifier/)

## Question Types and Topics

The 100 questions cover:

- **Basic Concepts**: Data types, vector selectors, label matching
- **Functions**: rate(), irate(), increase(), histogram_quantile(), etc.
- **Operators**: Aggregation, comparison, vector matching
- **Modifiers**: offset, @, bool
- **Advanced Topics**: Subqueries, recording rules, high-cardinality metrics

## Difficulty Levels

Questions are categorized into three difficulty levels:

- **BASIC**: Fundamental concepts and straightforward syntax
- **ADVANCED**: More complex functions and operators
- **EXPERT**: Advanced use cases, optimizations, and edge cases

## Example Question

```json
{
  "id": "7eec068e-4e08-4125-b453-21ac0db06bbe",
  "text": "Complete the query to select HTTP requests over the last 5 minutes:",
  "type": "CODE_COMPLETION",
  "template": "`http_requests_total[____]`",
  "gaps": ["5m"],
  "correctAnswers": ["5m"],
  "explanation": "Range vectors require a duration in square brackets. The format is `[5m]` for 5 minutes, `[1h]` for 1 hour, etc. This creates a range vector containing all samples within the specified time window.",
  "difficulty": "BASIC",
  "links": [
    {
      "description": "Range Vector Selectors",
      "url": "https://prometheus.io/docs/prometheus/latest/querying/basics/#range-vector-selectors"
    },
    {
      "description": "Time Durations",
      "url": "https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations"
    }
  ]
}
```
