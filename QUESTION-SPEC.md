### Specification for JSON Object Representing Questions

This JSON object is designed to represent a collection of questions for quizzes, assessments, or learning modules. Each question is structured with specific attributes to define its content, type, options, correct answers, and additional metadata. Below is a detailed description of the structure and purpose of each field in the JSON object:

---

#### Root Object
- **`questions`**: An array of question objects. Each object represents a single question with its associated metadata.

---

#### Question Object
Each question object contains the following fields:

1. **`id`** (string, required):
   - A unique identifier for the question.
   - Must be a valid GUID (Globally Unique Identifier).

2. **`text`** (string, required):
   - The main text or prompt of the question.
   - Should clearly describe the task or query for the user.

3. **`type`** (string, required):
   - Specifies the type of question. Possible values:
     - `CODE_COMPLETION`: A question requiring the user to complete a code snippet.
     - `SINGLE_CHOICE`: A question with multiple options where only one is correct.
     - `MULTIPLE_CHOICE`: A question with multiple options where more than one can be correct.

4. **`template`** (string, optional, for `CODE_COMPLETION` type):
   - A code snippet or template with placeholders (`____`) for the user to fill in.
   - Used only for `CODE_COMPLETION` questions.

5. **`gaps`** (array of strings, optional, for `CODE_COMPLETION` type):
   - Represents the correct values for the placeholders in the `template`.
   - Each value corresponds to a placeholder in the order they appear.

6. **`options`** (array of objects, required for `SINGLE_CHOICE` and `MULTIPLE_CHOICE` types):
   - A list of possible answers for the question.
   - Each option object contains:
     - **`id`** (string): A unique identifier for the option.
     - **`label`** (string): The text or content of the option. For technical content, wrap code or function names in backticks (e.g., `` `function_name` ``).

7. **`correctAnswers`** (array of strings, required):
   - A list of IDs corresponding to the correct answers.
   - For `SINGLE_CHOICE`, this array contains exactly one ID.
   - For `MULTIPLE_CHOICE`, this array contains one or more IDs.
   - For `CODE_COMPLETION`, this array contains the correct values for the `gaps`.

8. **`explanation`** (string, optional):
   - A detailed explanation of the correct answer(s).
   - Provides context or reasoning to help users understand the solution.

9. **`difficulty`** (string, optional):
   - Indicates the difficulty level of the question. Possible values:
     - `BASIC`
     - `INTERMEDIATE`
     - `EXPERT`

10. **`tags`** (array of strings, optional):
    - A list of tags or keywords associated with the question.
    - Useful for categorization or filtering (e.g., `PromQL`, `JavaScript`, `SQL`).

---

#### Example Question Types

1. **Code Completion**
   ```json
   {
     "id": "012a7a23-3f2b-4355-bfe5-1fdb2581cac9",
     "text": "Complete the advanced alert for SLA violation (P95 latency > 500ms for 5 minutes):",
     "type": "CODE_COMPLETION",
     "template": "`histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) ____ 0.5\nfor: ____`",
     "gaps": [">", "5m"],
     "correctAnswers": [">", "5m"],
     "explanation": "SLA alerts should use appropriate thresholds (0.5 = 500ms) and duration (5m) to avoid false positives while catching genuine violations.",
     "difficulty": "EXPERT",
     "tags": ["PromQL"]
   }
   ```

2. **Single Choice**
   ```json
   {
     "id": "74505cc8-8d39-4740-8276-65ba759095cd",
     "text": "Which of the following is a valid instant vector selector?",
     "type": "SINGLE_CHOICE",
     "options": [
       { "id": "117becf5-b917-4fbd-91af-3c93a7d43457", "label": "`http_requests_total`" },
       { "id": "a2ef033f-594d-4c7c-8c37-49cca8fda2eb", "label": "`http_requests_total[5m]`" },
       { "id": "20ce19dd-9671-4f63-a77f-f937170c39ec", "label": "`rate(http_requests_total)`" },
       { "id": "acea0736-e89a-4db0-95aa-a496132a0fb7", "label": "`sum(http_requests_total[5m])`" }
     ],
     "correctAnswers": ["117becf5-b917-4fbd-91af-3c93a7d43457"],
     "explanation": "An instant vector selector returns a single sample value for each time series at a given timestamp. Options with `[5m]` are range vectors, and functions return processed vectors.",
     "difficulty": "BASIC",
     "tags": ["PromQL"]
   }
   ```

3. **Multiple Choice**
   ```json
   {
     "id": "89fa6453-d8cb-40d5-82cf-3a8748269624",
     "text": "Which of the following are valid PromQL data types? (Select all that apply)",
     "type": "MULTIPLE_CHOICE",
     "options": [
       { "id": "d4ff020d-1ae9-4003-bf33-8718011b90b1", "label": "Instant vector" },
       { "id": "73c64054-8307-4b34-bc77-3f4095776c98", "label": "Range vector" },
       { "id": "62cd8363-9582-4021-8546-cf6626c47f09", "label": "Scalar" },
       { "id": "8ce7a24f-f548-46fc-90cb-4f2bd551fa2f", "label": "String literal" },
       { "id": "061584cb-323a-4894-bc00-948ef9e51159", "label": "Boolean" }
     ],
     "correctAnswers": [
       "d4ff020d-1ae9-4003-bf33-8718011b90b1",
       "73c64054-8307-4b34-bc77-3f4095776c98",
       "62cd8363-9582-4021-8546-cf6626c47f09",
       "8ce7a24f-f548-46fc-90cb-4f2bd551fa2f"
     ],
     "explanation": "PromQL supports four main data types: instant vectors (single samples), range vectors (samples over time), scalars (floating-point numbers), and string literals. Boolean is not a native PromQL data type.",
     "difficulty": "BASIC",
     "tags": ["PromQL"]
   }
   ```

### Full file example:

```json
{
  "questions": [
    {
      "id": "012a7a23-3f2b-4355-bfe5-1fdb2581cac9",
      "text": "Complete the advanced alert for SLA violation (P95 latency > 500ms for 5 minutes):",
      "type": "CODE_COMPLETION",
      "template": "`histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) ____ 0.5\nfor: ____`",
      "gaps": [
        ">",
        "5m"
      ],
      "correctAnswers": [
        ">",
        "5m"
      ],
      "explanation": "SLA alerts should use appropriate thresholds (0.5 = 500ms) and duration (5m) to avoid false positives while catching genuine violations.",
      "difficulty": "EXPERT",
      "tags": [
        "PromQL"
      ]
    },
    {
      "id": "74505cc8-8d39-4740-8276-65ba759095cd",
      "text": "Which of the following is a valid instant vector selector?",
      "type": "SINGLE_CHOICE",
      "options": [
        {
          "id": "117becf5-b917-4fbd-91af-3c93a7d43457",
          "label": "`http_requests_total`"
        },
        {
          "id": "a2ef033f-594d-4c7c-8c37-49cca8fda2eb",
          "label": "`http_requests_total[5m]`"
        },
        {
          "id": "20ce19dd-9671-4f63-a77f-f937170c39ec",
          "label": "`rate(http_requests_total)`"
        },
        {
          "id": "acea0736-e89a-4db0-95aa-a496132a0fb7",
          "label": "`sum(http_requests_total[5m])`"
        }
      ],
      "correctAnswers": [
        "117becf5-b917-4fbd-91af-3c93a7d43457"
      ],
      "explanation": "An instant vector selector returns a single sample value for each time series at a given timestamp. Options with `[5m]` are range vectors, and functions return processed vectors.",
      "difficulty": "BASIC",
      "tags": [
        "PromQL"
      ]
    },
    {
      "id": "89fa6453-d8cb-40d5-82cf-3a8748269624",
      "text": "Which of the following are valid PromQL data types? (Select all that apply)",
      "type": "MULTIPLE_CHOICE",
      "options": [
        {
          "id": "d4ff020d-1ae9-4003-bf33-8718011b90b1",
          "label": "Instant vector"
        },
        {
          "id": "73c64054-8307-4b34-bc77-3f4095776c98",
          "label": "Range vector"
        },
        {
          "id": "62cd8363-9582-4021-8546-cf6626c47f09",
          "label": "Scalar"
        },
        {
          "id": "8ce7a24f-f548-46fc-90cb-4f2bd551fa2f",
          "label": "String literal"
        },
        {
          "id": "061584cb-323a-4894-bc00-948ef9e51159",
          "label": "Boolean"
        }
      ],
      "correctAnswers": [
        "d4ff020d-1ae9-4003-bf33-8718011b90b1",
        "73c64054-8307-4b34-bc77-3f4095776c98",
        "62cd8363-9582-4021-8546-cf6626c47f09",
        "8ce7a24f-f548-46fc-90cb-4f2bd551fa2f"
      ],
      "explanation": "PromQL supports four main data types: instant vectors (single samples), range vectors (samples over time), scalars (floating-point numbers), and string literals. Boolean is not a native PromQL data type.",
      "difficulty": "BASIC",
      "tags": [
        "PromQL"
      ]
    }
  ]
}
```
