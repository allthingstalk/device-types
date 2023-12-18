{
  "sense": [
    {
      "switch": {
        "byte": 0
      },
      "on": [
        {
          "case": 3,
          "do": [
            {
              "asset": "line_1_total_in",
              "value": {
                "byte": 2,
                "bytelength": 4,
                "byteorder": "little",
                "type": "integer"
              }
            },
            {
              "asset": "line_1_total_out",
              "value": {
                "byte": 8,
                "bytelength": 4,
                "byteorder": "little",
                "type": "integer"
              }
            }
          ]
        },
        {
          "case": 5,
          "do": [
            {
              "asset": "period",
              "value": {
                "byte": 2,
                "bytelength": 4,
                "byteorder": "little",
                "type": "integer"
              }
            }
          ]
        }
      ]
    }
  ]
}