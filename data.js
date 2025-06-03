// Question Data
let questions = [
    {
        "id": "7eec068e-4e08-4125-b453-21ac0db06bbe",
        "text": "Complete the query to select HTTP requests over the last 5 minutes:",
        "type": "CODE_COMPLETION",
        "template": "`http_requests_total[____]`",
        "gaps": ["5m"],
        "correctAnswers": ["5m"],
        "explanation": "Range vectors require a duration in square brackets. The format is `[5m]` for 5 minutes, `[1h]` for 1 hour, etc. This creates a range vector containing all samples within the specified time window.",
        "difficulty": "BASIC"
    },
    {
        "id": "9ebfe079-8e77-4520-a3a4-bfa06177104b",
        "text": "Which of the following is a valid instant vector selector?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "2ccde2c3-4637-401b-b2e0-3cda01035ebd", "label": "`http_requests_total`" },
            { "id": "e612d944-e35f-4633-a958-cd8c978f86d3", "label": "`http_requests_total[5m]`" },
            { "id": "0963a6cc-f2fb-4d84-85a9-e3bfdaf7b71b", "label": "`rate(http_requests_total)`" },
            { "id": "f5d00a96-0b54-44f7-96e0-8ecdcf2448b1", "label": "`sum(http_requests_total[5m])`" }
        ],
        "correctAnswers": ["2ccde2c3-4637-401b-b2e0-3cda01035ebd"],
        "explanation": "An instant vector selector returns a single sample value for each time series at a given timestamp. Options with `[5m]` are range vectors, and functions return processed vectors.",
        "difficulty": "BASIC"
    },
    {
        "id": "18d5c0c8-2dc9-460e-be41-f2c5affe0039",
        "text": "What type of vector does `http_requests_total[5m]` return?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "81eadc52-58ac-4ad1-bcac-bbd0f479f2f9", "label": "Instant vector" },
            { "id": "66956d1a-a789-48a3-b2b5-130601dc1c8a", "label": "Range vector" },
            { "id": "54897f4d-14cb-41bc-b3f3-71b8799a76f7", "label": "Scalar" },
            { "id": "2bb517c7-26cb-400a-9c1e-c5e0d4a9b58f", "label": "String" }
        ],
        "correctAnswers": ["66956d1a-a789-48a3-b2b5-130601dc1c8a"],
        "explanation": "The square brackets `[5m]` indicate a range vector, which contains multiple samples over a time period. Instant vectors have no brackets and return single samples.",
        "difficulty": "BASIC"
    },
    {
        "id": "5ef41004-504a-441f-bdc9-99f56d5c5bf8",
        "text": "Which label matching operator performs exact string matching?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "bd6a3f03-7f44-451f-8eaa-a8f25b86ad3e", "label": "`=~`" },
            { "id": "baccb584-0c08-49d7-9964-b1fcdfba235e", "label": "`!~`" },
            { "id": "7992fecc-42d2-4f78-90d8-38bc341ae40a", "label": "`=`" },
            { "id": "7a70c0af-28b3-4420-9e07-53fb038dd526", "label": "`!=`" }
        ],
        "correctAnswers": ["7992fecc-42d2-4f78-90d8-38bc341ae40a"],
        "explanation": "The `=` operator performs exact string matching. `=~` is for regex matching, `!=` for negative exact matching, and `!~` for negative regex matching.",
        "difficulty": "BASIC"
    },
    {
        "id": "b9a387f3-5349-4618-9808-3711af453465",
        "text": "Which of the following are valid PromQL data types? (Select all that apply)",
        "type": "MULTIPLE_CHOICE",
        "options": [
            { "id": "19202bc6-a20b-4e43-a40b-df7b07108832", "label": "Instant vector" },
            { "id": "162eb461-b71d-4cbc-bf0d-db632992c076", "label": "Range vector" },
            { "id": "acd70a7a-7fa1-4d0b-9e37-669031a3d42c", "label": "Scalar" },
            { "id": "e678faa2-7c5c-4501-b315-b5945f7975ba", "label": "String literal" },
            { "id": "51bcc348-a8df-469f-93a8-977af217d215", "label": "Boolean" }
        ],
        "correctAnswers": [
            "19202bc6-a20b-4e43-a40b-df7b07108832",
            "162eb461-b71d-4cbc-bf0d-db632992c076",
            "acd70a7a-7fa1-4d0b-9e37-669031a3d42c",
            "e678faa2-7c5c-4501-b315-b5945f7975ba"
        ],
        "explanation": "PromQL supports four main data types: instant vectors (single samples), range vectors (samples over time), scalars (floating-point numbers), and string literals. Boolean is not a native PromQL data type.",
        "difficulty": "BASIC"
    },
    {
        "id": "a97e7332-c1a4-4a20-8ffd-453bb047ae37",
        "text": "What does the `rate()` function calculate?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "d0aa8891-e0ad-4df8-a02f-dc11a30ad667", "label": "Total increase over time" },
            { "id": "dc4eaa33-e610-43b7-9b05-6d96f963d0b9", "label": "Per-second average rate of increase" },
            { "id": "05acda68-44ae-40bb-b83d-d9e8befbef6f", "label": "Instantaneous rate of change" },
            { "id": "fc28de53-18dc-4032-b4cb-69091d468cd4", "label": "Maximum rate observed" }
        ],
        "correctAnswers": ["dc4eaa33-e610-43b7-9b05-6d96f963d0b9"],
        "explanation": "The `rate()` function calculates the per-second average rate of increase over a specified time window. It's designed for counter metrics and handles counter resets automatically.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "852ae0eb-b495-4e5f-9b73-3edff08c57de",
        "text": "Complete the query to get the 95th percentile of HTTP request duration:",
        "type": "CODE_COMPLETION",
        "template": "`histogram_quantile(____, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))`",
        "gaps": ["0.95"],
        "correctAnswers": ["0.95"],
        "explanation": "`histogram_quantile()` requires a quantile value between `0` and 1. `0.95` represents the 95th percentile. The function works with histogram buckets grouped by the `le` (less than or equal) label.",
        "difficulty": "BASIC"
    },
    {
        "id": "a5351aa8-7cef-4bd8-be7f-1e18410da128",
        "text": "Which aggregation operator would you use to get the top 5 highest values?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "5d9d1bad-e023-418e-bc34-4fd7b424e367", "label": "`max`" },
            { "id": "553a98f0-1c5c-4949-bdf6-a5e2d9e20fea", "label": "`topk`" },
            { "id": "85dc309a-8302-463b-a6e7-5afa4f32525b", "label": "`sum`" },
            { "id": "19be4d44-cbcf-40dd-8606-8775ef866413", "label": "`count`" }
        ],
        "correctAnswers": ["553a98f0-1c5c-4949-bdf6-a5e2d9e20fea"],
        "explanation": "`topk(5, metric)` returns the 5 highest values from the input vector. `max` returns only the single highest value, while `sum` adds all values together.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "be1b6f71-5207-465c-ba1b-82abc19a3dbd",
        "text": "Which functions should ONLY be used with counter metrics? (Select all that apply)",
        "type": "MULTIPLE_CHOICE",
        "options": [
            { "id": "af6f0f53-579c-4d7f-ae42-7723a022544f", "label": "`rate()`" },
            { "id": "3229b4e2-9fb7-4827-87c6-d951a34122e5", "label": "`irate()`" },
            { "id": "2578c70d-c5d7-467e-a077-af7e22d1d673", "label": "`increase()`" },
            { "id": "a1874793-28e3-4292-8c18-d1d2c2307591", "label": "`avg()`" },
            { "id": "611114ee-c790-48ca-b783-8a4064f047a2", "label": "`sum()`" }
        ],
        "correctAnswers": [
            "af6f0f53-579c-4d7f-ae42-7723a022544f",
            "3229b4e2-9fb7-4827-87c6-d951a34122e5",
            "2578c70d-c5d7-467e-a077-af7e22d1d673"
        ],
        "explanation": "`rate()`, `irate()`, and `increase()` are specifically designed for counter metrics that monotonically increase. They handle counter resets and extrapolation. `avg()` and `sum()` work with any numeric metrics.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "d48b2f57-b7a6-429f-9182-81b2fae0c1e5",
        "text": "What does the offset modifier do?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "506f06d6-95bb-4cfa-9559-e29d7383bec6", "label": "Changes the evaluation time forward" },
            { "id": "67c7e72c-dbcc-4811-9a63-57374ffd0239", "label": "Changes the evaluation time backward" },
            { "id": "80e0e759-0f5b-41aa-a605-b20c5fec16bd", "label": "Modifies the metric name" },
            { "id": "d9ad0870-97bf-476e-adb1-707687a379b0", "label": "Filters by time range" }
        ],
        "correctAnswers": ["67c7e72c-dbcc-4811-9a63-57374ffd0239"],
        "explanation": "The offset modifier shifts the evaluation time backward. For example, `metric offset 5m` evaluates the metric as it was 5 minutes ago, not at the current time.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "10c42dd7-13dd-4c62-9675-b4b1ed42cadd",
        "text": "Complete the query to sum HTTP requests by status code, excluding the instance label:",
        "type": "CODE_COMPLETION",
        "template": "`sum by (____) (http_requests_total)`",
        "gaps": ["status"],
        "correctAnswers": ["status"],
        "explanation": "The `by` clause specifies which labels to preserve in aggregation. Using `by (status)` groups results by status code while removing other labels like instance. This creates one time series per status code.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "2c276b4e-649f-4f01-91d5-26239226ce70",
        "text": "In the query rate(metric[5m]) > bool 0.1, what does the bool modifier do?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "2423011a-e3ce-433e-8170-19e0608a517b", "label": "Converts the result to boolean values" },
            { "id": "4d7569af-0ce7-4597-b56e-c54d849c9454", "label": "Filters out false values" },
            { "id": "63d422c6-b561-4071-b61c-570c71f26216", "label": "Returns 1 for true, 0 for false instead of filtering" },
            { "id": "3c524097-f0b1-4e9f-9ba6-2ed6868c331f", "label": "Makes the comparison case-insensitive" }
        ],
        "correctAnswers": ["63d422c6-b561-4071-b61c-570c71f26216"],
        "explanation": "The bool modifier changes comparison behavior. Without bool, comparisons filter results (keeping only matching series). With bool, all series are returned with values 1 (true) or 0 (false).",
        "difficulty": "EXPERT"
    },
    {
        "id": "0d3fe3a2-b937-4d65-8e7a-5b322f30eac0",
        "text": "Complete the subquery to get the maximum 5-minute rate over the past 30 minutes with 1-minute resolution:",
        "type": "CODE_COMPLETION",
        "template": "`max_over_time(rate(metric[5m])[____:____])`",
        "gaps": ["30m", "1m"],
        "correctAnswers": ["30m", "1m"],
        "explanation": "Subquery syntax is `[range:resolution]`. `[30m:1m]` evaluates the inner query every 1 minute over the past 30 minutes. `max_over_time` then finds the maximum value from those evaluations.",
        "difficulty": "EXPERT"
    },
    {
        "id": "07b42f7e-7d68-4bc9-88b5-742267a1d3cb",
        "text": "What's the difference between `irate()` and `rate()`?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "37cbb9fb-b0f7-42b0-9ad6-f115764065a3", "label": "`irate()` uses all samples, `rate()` uses two samples" },
            { "id": "47511fa2-f2bb-4911-97fa-ef0cb2e5bcc3", "label": "`rate()` uses all samples, `irate()` uses only the last two samples" },
            { "id": "6f3b1dc6-75e7-49b1-bba0-bed4087aafd7", "label": "`irate()` works with gauges, `rate()` works with counters" },
            { "id": "dc3333e1-649f-4d4d-b897-236886875b3b", "label": "No difference, they're synonymous" }
        ],
        "correctAnswers": ["47511fa2-f2bb-4911-97fa-ef0cb2e5bcc3"],
        "explanation": "`rate()` calculates the per-second average rate over the entire time window using all samples. `irate()` calculates the instantaneous rate using only the last two samples, providing more sensitivity to recent changes.",
        "difficulty": "EXPERT"
    },
    {
        "id": "9cabc875-222a-40cc-a450-ed3c90047c47",
        "text": "Which statements about vector matching are correct? (Select all that apply)",
        "type": "MULTIPLE_CHOICE",
        "options": [
            { "id": "365c2bd7-fafe-4769-a698-1352ddddda65", "label": "Vectors must have identical label sets to match" },
            { "id": "e678faa2-7c5c-4501-b315-b5945f7975ba", "label": "`on()` clause specifies which labels to match on" },
            { "id": "51bcc348-a8df-469f-93a8-977af217d215", "label": "`ignoring()` clause excludes labels from matching" },
            { "id": "a97e7332-c1a4-4a20-8ffd-453bb047ae37", "label": "`group_left` allows many-to-one matching" },
            { "id": "d0aa8891-e0ad-4df8-a02f-dc11a30ad667", "label": "Vector matching only works with arithmetic operators" }
        ],
        "correctAnswers": [
            "365c2bd7-fafe-4769-a698-1352ddddda65",
            "e678faa2-7c5c-4501-b315-b5945f7975ba",
            "51bcc348-a8df-469f-93a8-977af217d215",
            "a97e7332-c1a4-4a20-8ffd-453bb047ae37"
        ],
        "explanation": "Vector matching requires identical labels by default. `on()` and `ignoring()` modify matching behavior. `group_left`/`group_right` enable many-to-one/one-to-many matching. Vector matching works with all binary operators, not just arithmetic.",
        "difficulty": "EXPERT"
    },
    {
        "id": "fc28de53-18dc-4032-b4cb-69091d468cd4",
        "text": "Complete the query to calculate CPU utilization percentage from idle CPU time:",
        "type": "CODE_COMPLETION",
        "template": "`100 * (1 - avg by (instance) (______(node_cpu_seconds_total{mode='idle'}[5m])))`",
        "gaps": ["rate"],
        "correctAnswers": ["rate"],
        "explanation": "CPU utilization = `100 * (1 - idle_rate)`. Only `rate()` is needed to convert counter to per-second rate. The `avg by (instance)` already provides the average, so no outer function is required.",
        "difficulty": "EXPERT"
    },
    {
        "id": "852ae0eb-b495-4e5f-9b73-3edff08c57df",
        "text": "What does the @ modifier do in PromQL?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "a5351aa8-7cef-4bd8-be7f-1e18410da129", "label": "Creates an alias for the metric" },
            { "id": "5d9d1bad-e023-418e-bc34-4fd7b424e368", "label": "Evaluates the query at a specific Unix timestamp" },
            { "id": "553a98f0-1c5c-4949-bdf6-a5e2d9e20feb", "label": "Adds metadata to the result" },
            { "id": "85dc309a-8302-463b-a6e7-5afa4f32525c", "label": "Performs aggregation" }
        ],
        "correctAnswers": ["5d9d1bad-e023-418e-bc34-4fd7b424e368"],
        "explanation": "The `@` modifier evaluates a query at a specific point in time using Unix timestamp. For example, `metric @ 1609459200` evaluates the metric at that exact timestamp instead of the current time.",
        "difficulty": "EXPERT"
    },
    {
        "id": "19be4d44-cbcf-40dd-8606-8775ef866414",
        "text": "In a recording rule, why should you avoid using irate() with aggregation functions?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "be1b6f71-5207-465c-ba1b-82abc19a3dc1", "label": "`irate()` doesn't work with aggregation" },
            { "id": "af6f0f53-579c-4d7f-ae42-7723a022545a", "label": "It causes performance issues" },
            { "id": "3229b4e2-9fb7-4827-87c6-d951a34122e6", "label": "Counter resets may not be properly handled after aggregation" },
            { "id": "2578c70d-c5d7-467e-a077-af7e22d1d674", "label": "The syntax is invalid" }
        ],
        "correctAnswers": ["3229b4e2-9fb7-4827-87c6-d951a34122e6"],
        "explanation": "`irate()` should be applied before aggregation because it needs to detect counter resets in individual time series. Aggregating first can hide resets, leading to incorrect rate calculations.",
        "difficulty": "EXPERT"
    },
    {
        "id": "a1874793-28e3-4292-8c18-d1d2c2307592",
        "text": "Complete the query to match HTTP requests excluding 4xx status codes using regex:",
        "type": "CODE_COMPLETION",
        "template": "`http_requests_total{status____\"4..\"}`",
        "gaps": ["!~"],
        "correctAnswers": ["!~"],
        "explanation": "The `!~` operator performs negative regex matching. `status!~\"4..\"` excludes all status codes matching the pattern 4xx (400, 401, 404, etc.). The pattern `\"4..\"` matches any three-character string starting with 4.",
        "difficulty": "EXPERT"
    },
    {
        "id": "611114ee-c790-48ca-b783-8a4064f047a3",
        "text": "What happens when you use `absent()` function?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "d48b2f57-b7a6-429f-9182-81b2fae0c1e6", "label": "Returns 1 if the metric exists, 0 if it doesn't" },
            { "id": "506f06d6-95bb-4cfa-9559-e29d7383bec7", "label": "Returns 1 if the metric doesn't exist, nothing if it does" },
            { "id": "67c7e72c-dbcc-4811-9a63-57374ffd023a", "label": "Returns the count of missing metrics" },
            { "id": "80e0e759-0f5b-41aa-a605-b20c5fec16be", "label": "Removes the metric from results" }
        ],
        "correctAnswers": ["506f06d6-95bb-4cfa-9559-e29d7383bec7"],
        "explanation": "`absent()` returns a vector with value 1 when the input vector is empty (metric doesn't exist), and returns nothing when the input vector has data. It's useful for alerting on missing metrics.",
        "difficulty": "EXPERT"
    },
    {
        "id": "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
        "text": "Which function should you use to calculate the absolute increase over a time period?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555555", "label": "`rate()`" },
            { "id": "22222222-3333-4444-5555-666666666666", "label": "`increase()`" },
            { "id": "33333333-4444-5555-6666-777777777777", "label": "`irate()`" },
            { "id": "44444444-5555-6666-7777-888888888888", "label": "`delta()`" }
        ],
        "correctAnswers": ["22222222-3333-4444-5555-666666666666"],
        "explanation": "`increase()` calculates the absolute increase in a counter metric over the specified time window. Unlike `rate()`, it doesn't normalize to per-second values.",
        "difficulty": "BASIC"
    },
    {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "text": "Complete the query to get the average memory usage over the last hour:",
        "type": "CODE_COMPLETION",
        "template": "`______(node_memory_used_bytes[1h])`",
        "gaps": ["avg_over_time"],
        "correctAnswers": ["avg_over_time"],
        "explanation": "`avg_over_time()` calculates the average value of all samples in a range vector over the specified time window.",
        "difficulty": "BASIC"
    },
    {
        "id": "b2c3d4e5-f6a7-8901-2345-678901bcdefg",
        "text": "What type of metric should you use for measuring request latency?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "55555555-6666-7777-8888-999999999999", "label": "Counter" },
            { "id": "66666666-7777-8888-9999-000000000000", "label": "Gauge" },
            { "id": "77777777-8888-9999-0000-111111111111", "label": "Histogram" },
            { "id": "88888888-9999-0000-1111-222222222222", "label": "Summary" }
        ],
        "correctAnswers": ["77777777-8888-9999-0000-111111111111"],
        "explanation": "Histograms are ideal for measuring latency as they provide distribution information, allowing calculation of percentiles and SLA compliance monitoring.",
        "difficulty": "BASIC"
    },
    {
        "id": "c3d4e5f6-a7b8-9012-3456-789012cdefgh",
        "text": "Which operator would you use to combine metrics from different sources?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "99999999-0000-1111-2222-333333333333", "label": "`and`" },
            { "id": "00000000-1111-2222-3333-444444444444", "label": "`or`" },
            { "id": "11111111-2222-3333-4444-555555555556", "label": "`unless`" },
            { "id": "22222222-3333-4444-5555-666666666667", "label": "`+`" }
        ],
        "correctAnswers": ["00000000-1111-2222-3333-444444444444"],
        "explanation": "The `or` operator combines results from different vector operands, useful for creating union of metrics from different sources or fallback scenarios.",
        "difficulty": "BASIC"
    },
    {
        "id": "d4e5f6a7-b8c9-0123-4567-890123defghi",
        "text": "Complete the query to count the number of instances currently up:",
        "type": "CODE_COMPLETION",
        "template": "`____(up == 1)`",
        "gaps": ["count"],
        "correctAnswers": ["count"],
        "explanation": "`count()` aggregation function returns the number of elements in the input vector. Combined with a filter, it counts matching instances.",
        "difficulty": "BASIC"
    },
    {
        "id": "e5f6a7b8-c9d0-1234-5678-901234efghij",
        "text": "Which function calculates the derivative of a gauge metric?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "33333333-4444-5555-6666-777777777778", "label": "`deriv()`" },
            { "id": "44444444-5555-6666-7777-888888888889", "label": "`rate()`" },
            { "id": "55555555-6666-7777-8888-999999999990", "label": "`delta()`" },
            { "id": "66666666-7777-8888-9999-000000000001", "label": "`predict_linear()`" }
        ],
        "correctAnswers": ["33333333-4444-5555-6666-777777777778"],
        "explanation": "`deriv()` calculates the per-second derivative of a gauge metric using linear regression, showing the rate of change.",
        "difficulty": "BASIC"
    },
    {
        "id": "f6a7b8c9-d0e1-2345-6789-012345fghijk",
        "text": "What does the `changes()` function return?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "77777777-8888-9999-0000-111111111112", "label": "Number of times the value changed" },
            { "id": "88888888-9999-0000-1111-222222222223", "label": "Percentage of change" },
            { "id": "99999999-0000-1111-2222-333333333334", "label": "Rate of change per second" },
            { "id": "00000000-1111-2222-3333-444444444445", "label": "Last change timestamp" }
        ],
        "correctAnswers": ["77777777-8888-9999-0000-111111111112"],
        "explanation": "`changes()` returns the number of times a time series value has changed within the given time range.",
        "difficulty": "BASIC"
    },
    {
        "id": "a7b8c9d0-e1f2-3456-7890-123456ghijkl",
        "text": "Complete the query to get the minimum value over the last 10 minutes:",
        "type": "CODE_COMPLETION",
        "template": "`______(cpu_usage[10m])`",
        "gaps": ["min_over_time"],
        "correctAnswers": ["min_over_time"],
        "explanation": "`min_over_time()` returns the minimum value of all samples in the specified time range.",
        "difficulty": "BASIC"
    },
    {
        "id": "b8c9d0e1-f2a3-4567-8901-234567hijklm",
        "text": "Which aggregation function would you use to find the middle value?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555557", "label": "`avg()`" },
            { "id": "22222222-3333-4444-5555-666666666668", "label": "`quantile(0.5, ...)`" },
            { "id": "33333333-4444-5555-6666-777777777779", "label": "`stddev()`" },
            { "id": "44444444-5555-6666-7777-888888888880", "label": "`median()`" }
        ],
        "correctAnswers": ["22222222-3333-4444-5555-666666666668"],
        "explanation": "`quantile(0.5, ...)` calculates the median (50th percentile) of the input values, which is the middle value when sorted.",
        "difficulty": "BASIC"
    },
    {
        "id": "c9d0e1f2-a3b4-5678-9012-345678ijklmn",
        "text": "What is the correct syntax for a range vector with 2-hour duration?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "55555555-6666-7777-8888-999999999991", "label": "`metric{2h}`" },
            { "id": "66666666-7777-8888-9999-000000000002", "label": "`metric[2h]`" },
            { "id": "77777777-8888-9999-0000-111111111113", "label": "`metric(2h)`" },
            { "id": "88888888-9999-0000-1111-222222222224", "label": "`metric<2h>`" }
        ],
        "correctAnswers": ["66666666-7777-8888-9999-000000000002"],
        "explanation": "Range vectors use square brackets with duration inside: `[2h]` for 2 hours, `[30m]` for 30 minutes, etc.",
        "difficulty": "BASIC"
    },
    {
        "id": "d0e1f2a3-b4c5-6789-0123-456789jklmno",
        "text": "Complete the query to exclude metrics where job label is 'test':",
        "type": "CODE_COMPLETION",
        "template": "`http_requests_total{job____\"test\"}`",
        "gaps": ["!="],
        "correctAnswers": ["!="],
        "explanation": "The `!=` operator excludes time series where the specified label has the given value.",
        "difficulty": "BASIC"
    },
    {
        "id": "e1f2a3b4-c5d6-7890-1234-567890klmnop",
        "text": "Which function removes staleness markers from results?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "99999999-0000-1111-2222-333333333335", "label": "`present_over_time()`" },
            { "id": "00000000-1111-2222-3333-444444444446", "label": "`last_over_time()`" },
            { "id": "11111111-2222-3333-4444-555555555558", "label": "Range vector selectors automatically ignore staleness" },
            { "id": "22222222-3333-4444-5555-666666666669", "label": "`absent_over_time()`" }
        ],
        "correctAnswers": ["11111111-2222-3333-4444-555555555558"],
        "explanation": "Range vector selectors automatically ignore staleness markers and collect all available samples within the time window.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "f2a3b4c5-d6e7-8901-2345-678901lmnopq",
        "text": "Complete the query to calculate request rate per minute instead of per second:",
        "type": "CODE_COMPLETION",
        "template": "`rate(http_requests_total[5m]) * ____`",
        "gaps": ["60"],
        "correctAnswers": ["60"],
        "explanation": "Since `rate()` returns per-second values, multiply by 60 to get per-minute rates.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "a3b4c5d6-e7f8-9012-3456-789012mnopqr",
        "text": "Which label manipulation function would you use to create a new label from existing ones?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "33333333-4444-5555-6666-777777777780", "label": "`label_replace()`" },
            { "id": "44444444-5555-6666-7777-888888888881", "label": "`label_join()`" },
            { "id": "55555555-6666-7777-8888-999999999992", "label": "`label_keep()`" },
            { "id": "66666666-7777-8888-9999-000000000003", "label": "`label_drop()`" }
        ],
        "correctAnswers": ["44444444-5555-6666-7777-888888888881"],
        "explanation": "`label_join()` combines multiple label values into a new label using a specified separator.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "b4c5d6e7-f8a9-0123-4567-890123nopqrs",
        "text": "What is the result of `histogram_quantile(0.99, histogram_bucket)` when no data exists?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "77777777-8888-9999-0000-111111111114", "label": "Returns 0" },
            { "id": "88888888-9999-0000-1111-222222222225", "label": "Returns NaN" },
            { "id": "99999999-0000-1111-2222-333333333336", "label": "Returns empty result" },
            { "id": "00000000-1111-2222-3333-444444444447", "label": "Returns +Inf" }
        ],
        "correctAnswers": ["99999999-0000-1111-2222-333333333336"],
        "explanation": "When no histogram data exists, `histogram_quantile()` returns an empty result (no time series).",
        "difficulty": "ADVANCED"
    },
    {
        "id": "c5d6e7f8-a9b0-1234-5678-901234opqrst",
        "text": "Complete the recording rule to pre-calculate 5-minute request rates:",
        "type": "CODE_COMPLETION",
        "template": "`record: \"job:http_request_rate5m\"\nexpr: ______(http_requests_total[5m])`",
        "gaps": ["rate"],
        "correctAnswers": ["rate"],
        "explanation": "Recording rules should use descriptive names and pre-calculate expensive operations like `rate()` for reuse in dashboards and alerts.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "d6e7f8a9-b0c1-2345-6789-012345pqrstu",
        "text": "Which function predicts future values using linear regression?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555559", "label": "`predict_linear()`" },
            { "id": "22222222-3333-4444-5555-666666666660", "label": "`holt_winters()`" },
            { "id": "33333333-4444-5555-6666-777777777781", "label": "`deriv()`" },
            { "id": "44444444-5555-6666-7777-888888888882", "label": "`extrapolate()`" }
        ],
        "correctAnswers": ["11111111-2222-3333-4444-555555555559"],
        "explanation": "`predict_linear()` uses linear regression to extrapolate future metric values based on historical trends.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "e7f8a9b0-c1d2-3456-7890-123456qrstuv",
        "text": "What does `without()` clause do in aggregation?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "55555555-6666-7777-8888-999999999993", "label": "Excludes specified labels from grouping" },
            { "id": "66666666-7777-8888-9999-000000000004", "label": "Includes only specified labels in grouping" },
            { "id": "77777777-8888-9999-0000-111111111115", "label": "Removes metrics without specified labels" },
            { "id": "88888888-9999-0000-1111-222222222226", "label": "Filters out null values" }
        ],
        "correctAnswers": ["55555555-6666-7777-8888-999999999993"],
        "explanation": "`without()` excludes the specified labels from aggregation grouping, keeping all other labels.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "f8a9b0c1-d2e3-4567-8901-234567rstuvw",
        "text": "Complete the alert rule condition for disk space below 10%:",
        "type": "CODE_COMPLETION",
        "template": "`(node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 ____ 10`",
        "gaps": ["<"],
        "correctAnswers": ["<"],
        "explanation": "Alert conditions use comparison operators. Here `< 10` triggers when available disk space percentage falls below 10%.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "a9b0c1d2-e3f4-5678-9012-345678stuvwx",
        "text": "Which function should you use to fill gaps in sparse metrics?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "99999999-0000-1111-2222-333333333337", "label": "`or`" },
            { "id": "00000000-1111-2222-3333-444444444448", "label": "`unless`" },
            { "id": "11111111-2222-3333-4444-555555555560", "label": "`and`" },
            { "id": "22222222-3333-4444-5555-666666666661", "label": "`group_left`" }
        ],
        "correctAnswers": ["99999999-0000-1111-2222-333333333337"],
        "explanation": "The `or` operator can fill gaps by providing fallback values: `metric or 0` returns 0 when metric has no data.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "b0c1d2e3-f4a5-6789-0123-456789tuvwxy",
        "text": "What is the purpose of the `group()` aggregation function?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "33333333-4444-5555-6666-777777777782", "label": "Groups metrics by labels" },
            { "id": "44444444-5555-6666-7777-888888888883", "label": "Returns 1 for each group, ignoring values" },
            { "id": "55555555-6666-7777-8888-999999999994", "label": "Combines multiple metrics" },
            { "id": "66666666-7777-8888-9999-000000000005", "label": "Creates metric hierarchies" }
        ],
        "correctAnswers": ["44444444-5555-6666-7777-888888888883"],
        "explanation": "`group()` aggregation returns 1 for each group of time series, effectively counting unique label combinations while ignoring values.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "c1d2e3f4-a5b6-7890-1234-567890uvwxyz",
        "text": "Complete the query to get error rate as a percentage:",
        "type": "CODE_COMPLETION",
        "template": "`(rate(http_requests_total{status=~\"5..\"}[5m]) / ______(http_requests_total[5m])) * 100`",
        "gaps": ["rate"],
        "correctAnswers": ["rate"],
        "explanation": "Error rate percentage = (error_requests_rate / total_requests_rate) * 100. Both numerator and denominator need the same `rate()` function.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "d2e3f4a5-b6c7-8901-2345-678901vwxyza",
        "text": "Which modifier allows one-to-many vector matching?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "77777777-8888-9999-0000-111111111116", "label": "`group_left`" },
            { "id": "88888888-9999-0000-1111-222222222227", "label": "`group_right`" },
            { "id": "99999999-0000-1111-2222-333333333338", "label": "`on`" },
            { "id": "00000000-1111-2222-3333-444444444449", "label": "`ignoring`" }
        ],
        "correctAnswers": ["88888888-9999-0000-1111-222222222227"],
        "explanation": "`group_right` enables one-to-many matching where the right-hand side has multiple series matching each left-hand side series.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "e3f4a5b6-c7d8-9012-3456-789012wxyzab",
        "text": "What does `resets()` function calculate?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555561", "label": "Number of counter resets in the time range" },
            { "id": "22222222-3333-4444-5555-666666666662", "label": "Timestamp of last reset" },
            { "id": "33333333-4444-5555-6666-777777777783", "label": "Rate at which resets occur" },
            { "id": "44444444-5555-6666-7777-888888888884", "label": "Time since last reset" }
        ],
        "correctAnswers": ["11111111-2222-3333-4444-555555555561"],
        "explanation": "`resets()` counts the number of times a counter metric has reset (decreased) within the specified time range.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "f4a5b6c7-d8e9-0123-4567-890123xyzabc",
        "text": "Complete the query to find services with high memory usage (>80%):",
        "type": "CODE_COMPLETION",
        "template": "`(node_memory_used_bytes / node_memory_total_bytes) * 100 ____ 80`",
        "gaps": [">"],
        "correctAnswers": [">"],
        "explanation": "Use the `>` operator to filter for memory usage percentage above 80%.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "a5b6c7d8-e9f0-1234-5678-901234yzabcd",
        "text": "Which time function returns the current Unix timestamp?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "55555555-6666-7777-8888-999999999995", "label": "`time()`" },
            { "id": "66666666-7777-8888-9999-000000000006", "label": "`now()`" },
            { "id": "77777777-8888-9999-0000-111111111117", "label": "`timestamp()`" },
            { "id": "88888888-9999-0000-1111-222222222228", "label": "`current_time()`" }
        ],
        "correctAnswers": ["55555555-6666-7777-8888-999999999995"],
        "explanation": "`time()` returns the current Unix timestamp as a scalar value.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "b6c7d8e9-f0a1-2345-6789-012345zabcde",
        "text": "What is the difference between `sum()` and `sum_over_time()`?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "99999999-0000-1111-2222-333333333339", "label": "`sum()` aggregates across series, `sum_over_time()` across time" },
            { "id": "00000000-1111-2222-3333-444444444450", "label": "`sum()` works with ranges, `sum_over_time()` with instants" },
            { "id": "11111111-2222-3333-4444-555555555562", "label": "They are identical functions" },
            { "id": "22222222-3333-4444-5555-666666666663", "label": "`sum_over_time()` only works with counters" }
        ],
        "correctAnswers": ["99999999-0000-1111-2222-333333333339"],
        "explanation": "`sum()` aggregates values across multiple time series at a single point in time, while `sum_over_time()` sums all samples in a range vector for each series.",
        "difficulty": "ADVANCED"
    },
    {
        "id": "c7d8e9f0-a1b2-3456-7890-123456abcdef",
        "text": "Complete the subquery to get maximum CPU usage over 1 hour with 5-minute steps:",
        "type": "CODE_COMPLETION",
        "template": "`max_over_time(cpu_usage[____:____])`",
        "gaps": ["1h", "5m"],
        "correctAnswers": ["1h", "5m"],
        "explanation": "Subquery syntax `[range:step]` where `1h` is the time range and `5m` is the evaluation step interval.",
        "difficulty": "EXPERT"
    },
    {
        "id": "d8e9f0a1-b2c3-4567-8901-234567bcdefg",
        "text": "Which vector matching approach is preferred for generic recording rules?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "33333333-4444-5555-6666-777777777784", "label": "`on()` clause" },
            { "id": "44444444-5555-6666-7777-888888888885", "label": "`ignoring()` clause" },
            { "id": "55555555-6666-7777-8888-999999999996", "label": "Both are equivalent" },
            { "id": "66666666-7777-8888-9999-000000000007", "label": "Neither, use `group_left`" }
        ],
        "correctAnswers": ["44444444-5555-6666-7777-888888888885"],
        "explanation": "`ignoring()` is preferred for reusable rules as it preserves more labels, making rules more generic and shareable across different contexts.",
        "difficulty": "EXPERT"
    },
    {
        "id": "e9f0a1b2-c3d4-5678-9012-345678cdefgh",
        "text": "What is the correct way to handle counter resets in custom rate calculations?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "77777777-8888-9999-0000-111111111118", "label": "Use `resets()` function to detect and adjust" },
            { "id": "88888888-9999-0000-1111-222222222229", "label": "Always use built-in `rate()` function" },
            { "id": "99999999-0000-1111-2222-333333333340", "label": "Ignore resets as they're rare" },
            { "id": "00000000-1111-2222-3333-444444444451", "label": "Use `increase()` instead" }
        ],
        "correctAnswers": ["88888888-9999-0000-1111-222222222229"],
        "explanation": "Always use the built-in `rate()` function as it properly handles counter resets automatically. Manual calculations are error-prone.",
        "difficulty": "EXPERT"
    },
    {
        "id": "f0a1b2c3-d4e5-6789-0123-456789defghi",
        "text": "Complete the complex aggregation to get P99 latency by service:",
        "type": "CODE_COMPLETION",
        "template": "`histogram_quantile(0.99, sum(______(http_request_duration_seconds_bucket[5m])) by (service, le))`",
        "gaps": ["rate"],
        "correctAnswers": ["rate"],
        "explanation": "For histogram quantiles, use `rate()` on bucket counters, then aggregate by service and `le` label before applying `histogram_quantile()`.",
        "difficulty": "EXPERT"
    },
    {
        "id": "a1b2c3d4-e5f6-7890-1234-567890efghij",
        "text": "Which function helps identify when metrics stop being reported?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555563", "label": "`absent_over_time()`" },
            { "id": "22222222-3333-4444-5555-666666666664", "label": "`present_over_time()`" },
            { "id": "33333333-4444-5555-6666-777777777785", "label": "`last_over_time()`" },
            { "id": "44444444-5555-6666-7777-888888888886", "label": "`changes()`" }
        ],
        "correctAnswers": ["11111111-2222-3333-4444-555555555563"],
        "explanation": "`absent_over_time()` returns 1 when no samples exist in the specified time range, useful for detecting when metrics stop reporting.",
        "difficulty": "EXPERT"
    },
    {
        "id": "b2c3d4e5-f6a7-8901-2345-678901fghijk",
        "text": "What is the most efficient way to calculate CPU usage across multiple cores?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "55555555-6666-7777-8888-999999999997", "label": "Sum all cores then calculate rate" },
            { "id": "66666666-7777-8888-9999-000000000008", "label": "Calculate rate per core then average" },
            { "id": "77777777-8888-9999-0000-111111111119", "label": "Use recording rule with pre-aggregated data" },
            { "id": "88888888-9999-0000-1111-222222222230", "label": "Sample one core and extrapolate" }
        ],
        "correctAnswers": ["77777777-8888-9999-0000-111111111119"],
        "explanation": "Recording rules with pre-aggregated data provide the most efficient approach for frequently-accessed multi-core CPU calculations.",
        "difficulty": "EXPERT"
    },
    {
        "id": "c3d4e5f6-a7b8-9012-3456-789012ghijkl",
        "text": "Complete the query to detect high cardinality metrics (>1000 series):",
        "type": "CODE_COMPLETION",
        "template": "`count by (__name__) ({__name__=~\".+\"}) ____ 1000`",
        "gaps": [">"],
        "correctAnswers": [">"],
        "explanation": "This query counts time series per metric name and filters for those with more than 1000 series, helping identify cardinality issues.",
        "difficulty": "EXPERT"
    },
    {
        "id": "d4e5f6a7-b8c9-0123-4567-890123hijklm",
        "text": "Which approach correctly handles many-to-one metric joins with label conflicts?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "99999999-0000-1111-2222-333333333341", "label": "Use `on()` with all common labels" },
            { "id": "00000000-1111-2222-3333-444444444452", "label": "Use `ignoring()` with conflicting labels and `group_left()`" },
            { "id": "11111111-2222-3333-4444-555555555564", "label": "Pre-aggregate to remove conflicts" },
            { "id": "22222222-3333-4444-5555-666666666665", "label": "Use separate queries and combine externally" }
        ],
        "correctAnswers": ["00000000-1111-2222-3333-444444444452"],
        "explanation": "Use `ignoring()` to exclude conflicting labels and `group_left()` to preserve additional labels from the right-hand side in many-to-one joins.",
        "difficulty": "EXPERT"
    },
    {
        "id": "e5f6a7b8-c9d0-1234-5678-901234ijklmn",
        "text": "What is the limitation of `predict_linear()` for capacity planning?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "33333333-4444-5555-6666-777777777786", "label": "Only works with linear trends" },
            { "id": "44444444-5555-6666-7777-888888888887", "label": "Requires minimum 24 hours of data" },
            { "id": "55555555-6666-7777-8888-999999999998", "label": "Cannot predict beyond 1 week" },
            { "id": "66666666-7777-8888-9999-000000000009", "label": "Only works with counter metrics" }
        ],
        "correctAnswers": ["33333333-4444-5555-6666-777777777786"],
        "explanation": "`predict_linear()` assumes linear trends and may not accurately predict metrics with seasonal patterns, exponential growth, or other non-linear behaviors.",
        "difficulty": "EXPERT"
    },
    {
        "id": "f6a7b8c9-d0e1-2345-6789-012345jklmno",
        "text": "Complete the advanced alert for SLA violation (P95 latency > 500ms for 5 minutes):",
        "type": "CODE_COMPLETION",
        "template": "`histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) ____ 0.5\nfor: ____`",
        "gaps": [">", "5m"],
        "correctAnswers": [">", "5m"],
        "explanation": "SLA alerts should use appropriate thresholds (0.5 = 500ms) and duration (5m) to avoid false positives while catching genuine violations.",
        "difficulty": "EXPERT"
    },
    {
        "id": "a7b8c9d0-e1f2-3456-7890-123456klmnop",
        "text": "Which strategy best handles sparse metrics in dashboards?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "77777777-8888-9999-0000-111111111120", "label": "Use default values with `or` operator" },
            { "id": "88888888-9999-0000-1111-222222222231", "label": "Increase scrape interval" },
            { "id": "99999999-0000-1111-2222-333333333342", "label": "Use `absent()` to show missing data" },
            { "id": "00000000-1111-2222-3333-444444444453", "label": "Filter out sparse metrics entirely" }
        ],
        "correctAnswers": ["77777777-8888-9999-0000-111111111120"],
        "explanation": "Using `metric or 0` provides sensible default values for sparse metrics, ensuring consistent dashboard visualization without gaps.",
        "difficulty": "EXPERT"
    },
    {
        "id": "b8c9d0e1-f2a3-4567-8901-234567lmnopq",
        "text": "What is the recommended approach for cross-federation queries?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555565", "label": "Query each federation separately" },
            { "id": "22222222-3333-4444-5555-666666666666", "label": "Use federation labels for filtering" },
            { "id": "33333333-4444-5555-6666-777777777787", "label": "Implement recording rules on each side" },
            { "id": "44444444-5555-6666-7777-888888888888", "label": "Disable federation for complex queries" }
        ],
        "correctAnswers": ["33333333-4444-5555-6666-777777777787"],
        "explanation": "Recording rules on each federation side provide pre-aggregated data, reducing query complexity and improving performance for cross-federation scenarios.",
        "difficulty": "EXPERT"
    },
    {
        "id": "c9d0e1f2-a3b4-5678-9012-345678mnopqr",
        "text": "Complete the memory leak detection query using derivative:",
        "type": "CODE_COMPLETION",
        "template": "`______(avg_over_time(process_resident_memory_bytes[1h])) > 1048576`",
        "gaps": ["deriv"],
        "correctAnswers": ["deriv"],
        "explanation": "`deriv()` calculates the rate of change in memory usage; positive derivatives over time may indicate memory leaks (1048576 = 1MB/second).",
        "difficulty": "EXPERT"
    },
    {
        "id": "d0e1f2a3-b4c5-6789-0123-456789nopqrs",
        "text": "Which histogram bucket configuration best captures request latency distribution?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "55555555-6666-7777-8888-999999999999", "label": "Linear buckets: 0.1, 0.2, 0.3, 0.4, 0.5s" },
            { "id": "66666666-7777-8888-9999-000000000010", "label": "Exponential buckets: 0.01, 0.1, 1, 10s" },
            { "id": "77777777-8888-9999-0000-111111111121", "label": "Fixed buckets: 0.1, 0.5, 1.0s only" },
            { "id": "88888888-9999-0000-1111-222222222232", "label": "Single bucket: +Inf" }
        ],
        "correctAnswers": ["66666666-7777-8888-9999-000000000010"],
        "explanation": "Exponential buckets better capture wide latency distributions, providing good resolution for both fast and slow requests.",
        "difficulty": "EXPERT"
    },
    {
        "id": "e1f2a3b4-c5d6-7890-1234-567890opqrst",
        "text": "What causes 'many-to-many matching not allowed' errors?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "99999999-0000-1111-2222-333333333343", "label": "Missing group_left or group_right modifier" },
            { "id": "00000000-1111-2222-3333-444444444454", "label": "Incorrect label matching syntax" },
            { "id": "11111111-2222-3333-4444-555555555566", "label": "Using arithmetic operators incorrectly" },
            { "id": "22222222-3333-4444-5555-666666666667", "label": "Time series without common labels" }
        ],
        "correctAnswers": ["99999999-0000-1111-2222-333333333343"],
        "explanation": "Many-to-many errors occur when both sides have multiple matching series. Use `group_left` or `group_right` to specify which side is the 'many' side.",
        "difficulty": "EXPERT"
    },
    {
        "id": "f2a3b4c5-d6e7-8901-2345-678901pqrstu",
        "text": "Complete the query to calculate network utilization percentage:",
        "type": "CODE_COMPLETION",
        "template": "`(rate(node_network_transmit_bytes_total[5m]) * 8) / ______ * 100`",
        "gaps": ["node_network_speed_bytes"],
        "correctAnswers": ["node_network_speed_bytes"],
        "explanation": "Network utilization = (transmitted_bits_per_second / interface_speed_bits_per_second) * 100. Multiply bytes by 8 to get bits.",
        "difficulty": "EXPERT"
    },
    {
        "id": "a3b4c5d6-e7f8-9012-3456-789012qrstuv",
        "text": "Which aggregation preserves the most information for later analysis?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "33333333-4444-5555-6666-777777777788", "label": "`sum()` for totals" },
            { "id": "44444444-5555-6666-7777-888888888889", "label": "`avg()` for averages" },
            { "id": "55555555-6666-7777-8888-999999999990", "label": "`histogram_quantile()` for distributions" },
            { "id": "66666666-7777-8888-9999-000000000011", "label": "Recording rule with multiple aggregations" }
        ],
        "correctAnswers": ["66666666-7777-8888-9999-000000000011"],
        "explanation": "Recording rules with multiple aggregation levels (sum, avg, quantiles) preserve the most information while providing efficient access to different views.",
        "difficulty": "EXPERT"
    },
    {
        "id": "b4c5d6e7-f8a9-0123-4567-890123rstuvw",
        "text": "What is the correct way to handle timezone-aware queries?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "77777777-8888-9999-0000-111111111122", "label": "Use `@` modifier with timezone offset" },
            { "id": "88888888-9999-0000-1111-222222222233", "label": "Convert timestamps in recording rules" },
            { "id": "99999999-0000-1111-2222-333333333344", "label": "PromQL uses UTC only, handle in visualization" },
            { "id": "00000000-1111-2222-3333-444444444455", "label": "Use external time conversion functions" }
        ],
        "correctAnswers": ["99999999-0000-1111-2222-333333333344"],
        "explanation": "PromQL operates in UTC only. Timezone handling should be done in visualization tools like Grafana, not in PromQL queries.",
        "difficulty": "EXPERT"
    },
    {
        "id": "c5d6e7f8-a9b0-1234-5678-901234stuvwx",
        "text": "Complete the query to detect when error rate exceeds baseline by 3x:",
        "type": "CODE_COMPLETION",
        "template": "`rate(http_requests_total{status=~\"5..\"}[5m]) > ______ * avg_over_time(rate(http_requests_total{status=~\"5..\"}[5m])[24h:1h])`",
        "gaps": ["3"],
        "correctAnswers": ["3"],
        "explanation": "This compares current error rate to 3x the 24-hour baseline average, detecting anomalous spikes above normal patterns.",
        "difficulty": "EXPERT"
    },
    {
        "id": "d6e7f8a9-b0c1-2345-6789-012345tuvwxy",
        "text": "Which approach best handles high-cardinality label explosion?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "id": "11111111-2222-3333-4444-555555555567", "label": "Drop problematic labels in recording rules" },
            { "id": "22222222-3333-4444-5555-666666666668", "label": "Hash high-cardinality labels to reduce uniqueness" },
            { "id": "33333333-4444-5555-6666-777777777789", "label": "Sample metrics to reduce volume" },
            { "id": "44444444-5555-6666-7777-888888888890", "label": "Use separate metric names for different cardinalities" }
        ],
        "correctAnswers": ["11111111-2222-3333-4444-555555555567"],
        "explanation": "Recording rules that drop high-cardinality labels (like user_id, request_id) while preserving essential grouping labels provide the best balance of utility and performance.",
        "difficulty": "EXPERT"
    }
]

// Test Definitions
const tests = [
    {
        id: "b1e7e2c2-1f2a-4c3e-9e2b-1a2b3c4d5e6f", // Random GUID
        name: "PromQL test",
        questionPool: "all", // Use all questions in the pool
        questions: {
            BASIC: 5,
            ADVANCED: 5,
            EXPERT: 5
        },
        description: "A comprehensive test of your PromQL knowledge."
    }
];
