export const EXAMPLE_GRAPH = {
"nodes": [
  {
    "id": "network-1761024404271-2693",
    "type": "customNode",
    "position": {
      "x": -84.9478313551781,
      "y": 447.65313525231807
    },
    "data": {
      "type": "network",
      "label": "NETWORK",
      "nodeId": "network-1761024404271-2693"
    },
    "measured": {
      "width": 236,
      "height": 202
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "cell-area-1",
    "type": "customNode",
    "position": {
      "x": -2715.492478571975,
      "y": 827.6531352523181
    },
    "data": {
      "type": "cell-area",
      "label": "Private Area",
      "parentId": "network-1761024404271-2693",
      "nodeId": "cell-area-1",
      "cellAreaId": 1,
      "cellAreaDescription": "Private Area",
      "nodeNumber": 1,
      "id": "cell-area-1",
      "notes": "Private area isolated from public subscribers with specific TAC(s)",
      "description": "Node"
    },
    "measured": {
      "width": 239,
      "height": 250
    },
    "selected": false
  },
  {
    "id": "cell-area-2",
    "type": "customNode",
    "position": {
      "x": -86.4478313551781,
      "y": 827.6531352523181
    },
    "data": {
      "type": "cell-area",
      "label": "Public Area",
      "parentId": "network-1761024404271-2693",
      "nodeId": "cell-area-2",
      "cellAreaId": 2,
      "cellAreaDescription": "Public Area",
      "nodeNumber": 2,
      "id": "cell-area-2",
      "notes": "Public area with specified TAC(s)",
      "description": "Node"
    },
    "measured": {
      "width": 239,
      "height": 250
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrp-1",
    "type": "customNode",
    "position": {
      "x": -4242.5785381422875,
      "y": 1207.653135252318
    },
    "data": {
      "type": "rrp",
      "label": "RRP Node",
      "parentId": "cell-area-1",
      "nodeId": "rrp-1",
      "rrpId": 1,
      "rrpPercentage": 100,
      "rrpName": "Private",
      "rrpBands": [
        {
          "name": "n78",
          "dl": 50,
          "ul": 50
        },
        {
          "name": "n28",
          "dl": 50,
          "ul": 50
        }
      ],
      "nodeNumber": 1,
      "description": "Node"
    },
    "measured": {
      "width": 425,
      "height": 587
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrp-2",
    "type": "customNode",
    "position": {
      "x": -2808.492478571975,
      "y": 1207.653135252318
    },
    "data": {
      "type": "rrp",
      "label": "RRP Node",
      "parentId": "cell-area-1",
      "nodeId": "rrp-2",
      "rrpId": 2,
      "rrpPercentage": 100,
      "rrpName": "Premium",
      "rrpBands": [
        {
          "name": "n78",
          "dl": 10,
          "ul": 10
        },
        {
          "name": "n28",
          "dl": 10,
          "ul": 10
        }
      ],
      "nodeNumber": 2,
      "description": "Node"
    },
    "measured": {
      "width": 425,
      "height": 587
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrp-3",
    "type": "customNode",
    "position": {
      "x": -1374.4064190016625,
      "y": 1207.653135252318
    },
    "data": {
      "type": "rrp",
      "label": "RRP Node",
      "parentId": "cell-area-1",
      "nodeId": "rrp-3",
      "rrpId": 3,
      "rrpPercentage": 100,
      "rrpName": "Basic",
      "rrpFiveQI": [
        {
          "value": "9"
        }
      ],
      "rrpBands": [
        {
          "name": "n78",
          "dl": 10,
          "ul": 10
        },
        {
          "name": "n28",
          "dl": 10,
          "ul": 10
        }
      ],
      "nodeNumber": 3,
      "description": "Node"
    },
    "measured": {
      "width": 425,
      "height": 587
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024405250-4089",
    "type": "customNode",
    "position": {
      "x": -4653.6757061110375,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-1",
      "nodeId": "rrpmember-1761024405250-4089",
      "plmnValue": "240 01",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024405251-1576",
    "type": "customNode",
    "position": {
      "x": -3635.4813701735375,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-1",
      "nodeId": "rrpmember-1761024405251-1576",
      "plmnValue": "240 49",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024405251-9845",
    "type": "customNode",
    "position": {
      "x": -2967.711228571975,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-2",
      "nodeId": "rrpmember-1761024405251-9845",
      "plmnValue": "240 01",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024405251-3706",
    "type": "customNode",
    "position": {
      "x": -2453.273728571975,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-2",
      "nodeId": "rrpmember-1761024405251-3706",
      "plmnValue": "240 49",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024405251-9126",
    "type": "customNode",
    "position": {
      "x": -1533.6251690016625,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-3",
      "nodeId": "rrpmember-1761024405251-9126",
      "plmnValue": "240 01",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024405251-2468",
    "type": "customNode",
    "position": {
      "x": -1019.1876690016625,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-3",
      "nodeId": "rrpmember-1761024405251-2468",
      "plmnValue": "240 49",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "s-nssai-1",
    "type": "customNode",
    "position": {
      "x": -4191.990789355816,
      "y": 2158.0707292857624
    },
    "data": {
      "type": "s-nssai",
      "label": "S-NSSAI",
      "parentId": "rrpmember-1761024405251-1576",
      "nodeId": "s-nssai-1",
      "snssaiId": 1,
      "sd": "1",
      "sst": "51"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "s-nssai-2",
    "type": "customNode",
    "position": {
      "x": -3227.15319126551,
      "y": 2158.0707292857624
    },
    "data": {
      "type": "s-nssai",
      "label": "S-NSSAI",
      "parentId": "rrpmember-1761024405251-1576",
      "nodeId": "s-nssai-2",
      "snssaiId": 2,
      "sd": "1",
      "sst": "52"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "s-nssai-3",
    "type": "customNode",
    "position": {
      "x": -1392.1991588698265,
      "y": 2167.653135252318
    },
    "data": {
      "type": "s-nssai",
      "label": "S-NSSAI",
      "parentId": "rrpmember-1761024405251-3706",
      "nodeId": "s-nssai-3",
      "snssaiId": 3,
      "sd": "1",
      "sst": "53"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "s-nssai-4",
    "type": "customNode",
    "position": {
      "x": -330.0887462721703,
      "y": 2167.653135252318
    },
    "data": {
      "type": "s-nssai",
      "label": "S-NSSAI",
      "parentId": "rrpmember-1761024405251-2468",
      "nodeId": "s-nssai-4",
      "snssaiId": 4,
      "sd": "1",
      "sst": "54"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "dnn-1",
    "type": "customNode",
    "position": {
      "x": -4320.595187864177,
      "y": 2579.6311427105124
    },
    "data": {
      "type": "dnn",
      "label": "DNN",
      "parentId": "s-nssai-1",
      "nodeId": "dnn-1",
      "dnnId": 1,
      "dnnCustomName": "customer_a.lpg99.abc.ns",
      "nodeNumber": 1,
      "dnnActive": false
    },
    "measured": {
      "width": 573,
      "height": 330
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "dnn-2",
    "type": "customNode",
    "position": {
      "x": -3359.048792757149,
      "y": 2577.2355412188735
    },
    "data": {
      "type": "dnn",
      "label": "DNN",
      "parentId": "s-nssai-2",
      "nodeId": "dnn-2",
      "dnnId": 2,
      "dnnCustomName": "customer_a.lpg99.def.ns",
      "nodeNumber": 2,
      "dnnActive": false
    },
    "measured": {
      "width": 573,
      "height": 330
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "dnn-3",
    "type": "customNode",
    "position": {
      "x": -1523.1991588698265,
      "y": 2567.653135252318
    },
    "data": {
      "type": "dnn",
      "label": "DNN",
      "parentId": "s-nssai-3",
      "nodeId": "dnn-3",
      "dnnId": 3,
      "dnnCustomName": "customer_a.lpg99.ghi.ns",
      "nodeNumber": 3,
      "dnnActive": false
    },
    "measured": {
      "width": 573,
      "height": 330
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "dnn-4",
    "type": "customNode",
    "position": {
      "x": -461.0887462721703,
      "y": 2567.653135252318
    },
    "data": {
      "type": "dnn",
      "label": "DNN",
      "parentId": "s-nssai-4",
      "nodeId": "dnn-4",
      "dnnId": 4,
      "dnnCustomName": "customer_a.lpg99.jkl.ns",
      "nodeNumber": 4,
      "dnnActive": false
    },
    "measured": {
      "width": 573,
      "height": 330
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrp-4",
    "type": "customNode",
    "position": {
      "x": -524.5152141676781,
      "y": 1207.653135252318
    },
    "data": {
      "type": "rrp",
      "label": "RRP Node",
      "parentId": "cell-area-2",
      "nodeId": "rrp-4",
      "rrpId": 4,
      "rrpPercentage": 100,
      "rrpName": "Premium",
      "rrpBands": [
        {
          "name": "n78",
          "dl": 10,
          "ul": 10
        },
        {
          "name": "n28",
          "dl": 10,
          "ul": 10
        }
      ],
      "nodeNumber": 4,
      "description": "Node"
    },
    "measured": {
      "width": 425,
      "height": 587
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrp-5",
    "type": "customNode",
    "position": {
      "x": 165.6195514573219,
      "y": 1207.653135252318
    },
    "data": {
      "type": "rrp",
      "label": "RRP Node",
      "parentId": "cell-area-2",
      "nodeId": "rrp-5",
      "rrpId": 5,
      "rrpPercentage": 100,
      "rrpName": "Basic",
      "rrpFiveQI": [
        {
          "value": "9"
        }
      ],
      "rrpBands": [
        {
          "name": "n78",
          "dl": 50,
          "ul": 50
        },
        {
          "name": "n28",
          "dl": 50,
          "ul": 50
        }
      ],
      "nodeNumber": 5,
      "description": "Node"
    },
    "measured": {
      "width": 425,
      "height": 587
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024408764-522",
    "type": "customNode",
    "position": {
      "x": -603.9058391676781,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-4",
      "nodeId": "rrpmember-1761024408764-522",
      "plmnValue": "240 01",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024408764-1685",
    "type": "customNode",
    "position": {
      "x": -249.1245891676781,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-4",
      "nodeId": "rrpmember-1761024408764-1685",
      "plmnValue": "240 49",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024408764-1508",
    "type": "customNode",
    "position": {
      "x": 86.2289264573219,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-5",
      "nodeId": "rrpmember-1761024408764-1508",
      "plmnValue": "240 01",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "rrpmember-1761024408764-3690",
    "type": "customNode",
    "position": {
      "x": 441.0101764573219,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-5",
      "nodeId": "rrpmember-1761024408764-3690",
      "plmnValue": "240 49",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "cell-area-3",
    "type": "customNode",
    "position": {
      "x": 2542.596815861619,
      "y": 827.6531352523181
    },
    "data": {
      "type": "cell-area",
      "label": "CELL-AREA Node",
      "parentId": "network-1761024404271-2693",
      "nodeId": "cell-area-3",
      "cellAreaId": 3,
      "cellAreaDescription": "",
      "description": "Node",
      "nodeNumber": 3,
      "id": "cell-area-3",
      "notes": "Dedicated area with local spectrum"
    },
    "measured": {
      "width": 239,
      "height": 222
    },
    "selected": false
  },
  {
    "id": "rrp-6",
    "type": "customNode",
    "position": {
      "x": 2449.596815861619,
      "y": 1207.653135252318
    },
    "data": {
      "type": "rrp",
      "label": "RRP Node",
      "parentId": "cell-area-3",
      "nodeId": "rrp-6",
      "rrpId": 6,
      "rrpPercentage": 100,
      "nodeNumber": 6,
      "rrpBands": [
        {
          "name": "n78",
          "dl": 100,
          "ul": 100
        }
      ],
      "description": "Node"
    },
    "measured": {
      "width": 425,
      "height": 464
    },
    "selected": false
  },
  {
    "id": "rrpmember-1761498661851-1597",
    "type": "customNode",
    "position": {
      "x": 2547.596815861619,
      "y": 1807.653135252318
    },
    "data": {
      "type": "rrpmember",
      "label": "RRPMEMBER Node",
      "parentId": "rrp-6",
      "nodeId": "rrpmember-1761498661851-1597",
      "plmnValue": "999 049",
      "description": "Node"
    },
    "measured": {
      "width": 229,
      "height": 170
    }
  },
  {
    "id": "s-nssai-5",
    "type": "customNode",
    "position": {
      "x": 2506.596815861619,
      "y": 2167.653135252318
    },
    "data": {
      "type": "s-nssai",
      "label": "S-NSSAI",
      "parentId": "rrpmember-1761498661851-1597",
      "nodeId": "s-nssai-5",
      "snssaiId": 5,
      "sd": "1",
      "sst": "55"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false
  },
  {
    "id": "dnn-5",
    "type": "customNode",
    "position": {
      "x": 2375.596815861619,
      "y": 2567.653135252318
    },
    "data": {
      "type": "dnn",
      "label": "DNN",
      "parentId": "s-nssai-5",
      "nodeId": "dnn-5",
      "dnnId": 5,
      "nodeNumber": 5,
      "dnnActive": false
    },
    "measured": {
      "width": 573,
      "height": 330
    },
    "selected": false
  },
  {
    "id": "qosflow-1765735360728-5186",
    "type": "customNode",
    "position": {
      "x": -330.0887462721703,
      "y": 2967.653135252318
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-4",
      "nodeId": "qosflow-1765735360728-5186",
      "qosFlowId": 1,
      "qosFlowName": "QoS Flow 1",
      "nodeNumber": 5186,
      "isDefault": false
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false
  },
  {
    "id": "fiveqi-1765735366325-1118",
    "type": "customNode",
    "position": {
      "x": -363.5887462721703,
      "y": 3347.653135252318
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765735360728-5186",
      "nodeId": "fiveqi-1765735366325-1118",
      "fiveQIId": "3"
    },
    "measured": {
      "width": 378,
      "height": 395
    }
  },
  {
    "id": "qosflow-1765742249987-6969",
    "type": "customNode",
    "position": {
      "x": -1392.1991588698265,
      "y": 2967.653135252318
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-3",
      "nodeId": "qosflow-1765742249987-6969",
      "qosFlowId": 2,
      "qosFlowName": "QoS Flow 2"
    },
    "measured": {
      "width": 311,
      "height": 333
    }
  },
  {
    "id": "fiveqi-1765742261723-2580",
    "type": "customNode",
    "position": {
      "x": -1496.6991588698265,
      "y": 3347.653135252318
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765742249987-6969",
      "nodeId": "fiveqi-1765742261723-2580",
      "fiveQIId": "7"
    },
    "measured": {
      "width": 520,
      "height": 395
    }
  },
  {
    "id": "qosflow-1765742278619-2277",
    "type": "customNode",
    "position": {
      "x": 2506.596815861619,
      "y": 2967.653135252318
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-5",
      "nodeId": "qosflow-1765742278619-2277",
      "qosFlowId": 3,
      "qosFlowName": "QoS Flow 3"
    },
    "measured": {
      "width": 311,
      "height": 333
    }
  },
  {
    "id": "fiveqi-1765742288056-502",
    "type": "customNode",
    "position": {
      "x": 2410.096815861619,
      "y": 3347.653135252318
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765742278619-2277",
      "nodeId": "fiveqi-1765742288056-502",
      "fiveQIId": "9"
    },
    "measured": {
      "width": 504,
      "height": 395
    }
  },
  {
    "id": "qosflow-1765742319815-2443",
    "type": "customNode",
    "position": {
      "x": -3225.6531912655096,
      "y": 2962.86193226904
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-2",
      "nodeId": "qosflow-1765742319815-2443",
      "qosFlowId": 4,
      "qosFlowName": "QoS Flow 4"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "fiveqi-1765742330056-523",
    "type": "customNode",
    "position": {
      "x": -3206.1531912655096,
      "y": 3339.155578141055
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765742319815-2443",
      "nodeId": "fiveqi-1765742330056-523",
      "fiveQIId": "79"
    },
    "measured": {
      "width": 272,
      "height": 395
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "qosflow-1765742367785-6322",
    "type": "customNode",
    "position": {
      "x": -4600.824586372538,
      "y": 2962.86193226904
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-1",
      "nodeId": "qosflow-1765742367785-6322",
      "qosFlowId": 5,
      "qosFlowName": "QoS Flow 5"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "qosflow-1765742370261-9565",
    "type": "customNode",
    "position": {
      "x": -4189.595187864177,
      "y": 2960.4663307774013
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-1",
      "nodeId": "qosflow-1765742370261-9565",
      "qosFlowId": 6,
      "qosFlowName": "QoS Flow 6"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "qosflow-1765742372517-8528",
    "type": "customNode",
    "position": {
      "x": -3761.5965789143424,
      "y": 2962.86193226904
    },
    "data": {
      "type": "qosflow",
      "label": "QOSFLOW Node",
      "parentId": "dnn-1",
      "nodeId": "qosflow-1765742372517-8528",
      "qosFlowId": 7,
      "qosFlowName": "QoS Flow 7"
    },
    "measured": {
      "width": 311,
      "height": 333
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "fiveqi-1765742404554-3661",
    "type": "customNode",
    "position": {
      "x": -4583.720187864176,
      "y": 3341.626480893045
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765742367785-6322",
      "nodeId": "fiveqi-1765742404554-3661",
      "fiveQIId": "79"
    },
    "measured": {
      "width": 274,
      "height": 398
    },
    "selected": true,
    "dragging": false
  },
  {
    "id": "fiveqi-1765742412680-9177",
    "type": "customNode",
    "position": {
      "x": -4286.095187864175,
      "y": 3338.0707292857624
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765742370261-9565",
      "nodeId": "fiveqi-1765742412680-9177",
      "fiveQIId": "9"
    },
    "measured": {
      "width": 504,
      "height": 395
    },
    "selected": false,
    "dragging": false
  },
  {
    "id": "fiveqi-1765742417528-9100",
    "type": "customNode",
    "position": {
      "x": -3772.6681207404267,
      "y": 3340.4663307774013
    },
    "data": {
      "type": "fiveqi",
      "label": "FIVEQI Node",
      "parentId": "qosflow-1765742372517-8528",
      "nodeId": "fiveqi-1765742417528-9100",
      "fiveQIId": "7"
    },
    "measured": {
      "width": 520,
      "height": 395
    },
    "selected": false,
    "dragging": false
  }
],
"edges": [
  {
    "id": "unified-rrp-1-rrpmember-1761024405250-4089",
    "source": "rrp-1",
    "target": "rrpmember-1761024405250-4089",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-1-rrpmember-1761024405251-1576",
    "source": "rrp-1",
    "target": "rrpmember-1761024405251-1576",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-2-rrpmember-1761024405251-9845",
    "source": "rrp-2",
    "target": "rrpmember-1761024405251-9845",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-2-rrpmember-1761024405251-3706",
    "source": "rrp-2",
    "target": "rrpmember-1761024405251-3706",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-3-rrpmember-1761024405251-9126",
    "source": "rrp-3",
    "target": "rrpmember-1761024405251-9126",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-3-rrpmember-1761024405251-2468",
    "source": "rrp-3",
    "target": "rrpmember-1761024405251-2468",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-network-1761024404271-2693-cell-area-1",
    "source": "network-1761024404271-2693",
    "target": "cell-area-1",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-network-1761024404271-2693-cell-area-2",
    "source": "network-1761024404271-2693",
    "target": "cell-area-2",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrpmember-1761024405251-1576-s-nssai-1",
    "source": "rrpmember-1761024405251-1576",
    "target": "s-nssai-1",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    },
    "selected": false
  },
  {
    "id": "unified-rrpmember-1761024405251-1576-s-nssai-2",
    "source": "rrpmember-1761024405251-1576",
    "target": "s-nssai-2",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrpmember-1761024405251-3706-s-nssai-3",
    "source": "rrpmember-1761024405251-3706",
    "target": "s-nssai-3",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrpmember-1761024405251-2468-s-nssai-4",
    "source": "rrpmember-1761024405251-2468",
    "target": "s-nssai-4",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-cell-area-1-rrp-1",
    "source": "cell-area-1",
    "target": "rrp-1",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-cell-area-1-rrp-2",
    "source": "cell-area-1",
    "target": "rrp-2",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-cell-area-1-rrp-3",
    "source": "cell-area-1",
    "target": "rrp-3",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-s-nssai-1-dnn-1",
    "source": "s-nssai-1",
    "target": "dnn-1",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-s-nssai-2-dnn-2",
    "source": "s-nssai-2",
    "target": "dnn-2",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-s-nssai-3-dnn-3",
    "source": "s-nssai-3",
    "target": "dnn-3",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-s-nssai-4-dnn-4",
    "source": "s-nssai-4",
    "target": "dnn-4",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-4-rrpmember-1761024408764-522",
    "source": "rrp-4",
    "target": "rrpmember-1761024408764-522",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-4-rrpmember-1761024408764-1685",
    "source": "rrp-4",
    "target": "rrpmember-1761024408764-1685",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-5-rrpmember-1761024408764-1508",
    "source": "rrp-5",
    "target": "rrpmember-1761024408764-1508",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-5-rrpmember-1761024408764-3690",
    "source": "rrp-5",
    "target": "rrpmember-1761024408764-3690",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-cell-area-2-rrp-4",
    "source": "cell-area-2",
    "target": "rrp-4",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-cell-area-2-rrp-5",
    "source": "cell-area-2",
    "target": "rrp-5",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrpmember-1761024408764-1685-s-nssai-3",
    "source": "rrpmember-1761024408764-1685",
    "target": "s-nssai-3",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "manual"
    }
  },
  {
    "id": "unified-rrpmember-1761024408764-3690-s-nssai-4",
    "source": "rrpmember-1761024408764-3690",
    "target": "s-nssai-4",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "manual"
    }
  },
  {
    "id": "unified-network-1761024404271-2693-cell-area-3",
    "source": "network-1761024404271-2693",
    "target": "cell-area-3",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-cell-area-3-rrp-6",
    "source": "cell-area-3",
    "target": "rrp-6",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrp-6-rrpmember-1761498661851-1597",
    "source": "rrp-6",
    "target": "rrpmember-1761498661851-1597",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-rrpmember-1761498661851-1597-s-nssai-5",
    "source": "rrpmember-1761498661851-1597",
    "target": "s-nssai-5",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-s-nssai-5-dnn-5",
    "source": "s-nssai-5",
    "target": "dnn-5",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-4-qosflow-1765735360728-5186",
    "source": "dnn-4",
    "target": "qosflow-1765735360728-5186",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765735360728-5186-fiveqi-1765735366325-1118",
    "source": "qosflow-1765735360728-5186",
    "target": "fiveqi-1765735366325-1118",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-3-qosflow-1765742249987-6969",
    "source": "dnn-3",
    "target": "qosflow-1765742249987-6969",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765742249987-6969-fiveqi-1765742261723-2580",
    "source": "qosflow-1765742249987-6969",
    "target": "fiveqi-1765742261723-2580",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-5-qosflow-1765742278619-2277",
    "source": "dnn-5",
    "target": "qosflow-1765742278619-2277",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765742278619-2277-fiveqi-1765742288056-502",
    "source": "qosflow-1765742278619-2277",
    "target": "fiveqi-1765742288056-502",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-2-qosflow-1765742319815-2443",
    "source": "dnn-2",
    "target": "qosflow-1765742319815-2443",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765742319815-2443-fiveqi-1765742330056-523",
    "source": "qosflow-1765742319815-2443",
    "target": "fiveqi-1765742330056-523",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-1-qosflow-1765742367785-6322",
    "source": "dnn-1",
    "target": "qosflow-1765742367785-6322",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-1-qosflow-1765742370261-9565",
    "source": "dnn-1",
    "target": "qosflow-1765742370261-9565",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-dnn-1-qosflow-1765742372517-8528",
    "source": "dnn-1",
    "target": "qosflow-1765742372517-8528",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765742367785-6322-fiveqi-1765742404554-3661",
    "source": "qosflow-1765742367785-6322",
    "target": "fiveqi-1765742404554-3661",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765742370261-9565-fiveqi-1765742412680-9177",
    "source": "qosflow-1765742370261-9565",
    "target": "fiveqi-1765742412680-9177",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  },
  {
    "id": "unified-qosflow-1765742372517-8528-fiveqi-1765742417528-9100",
    "source": "qosflow-1765742372517-8528",
    "target": "fiveqi-1765742417528-9100",
    "sourceHandle": "bottom-source",
    "targetHandle": "top-target",
    "type": "default",
    "animated": false,
    "style": {
      "stroke": "#2563eb",
      "strokeWidth": 3,
      "opacity": 1
    },
    "markerEnd": {
      "type": "arrowclosed",
      "color": "#2563eb",
      "width": 12,
      "height": 12
    },
    "data": {
      "createdBy": "auto"
    }
  }
],
"timestamp": 1765744810069
};