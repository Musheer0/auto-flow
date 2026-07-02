const data ={
  "edges": [
    {
      "id": "xy-edge__q1jrnp3sg724un08lxp89wvjsource-mlfun7t32xccm2xm8rutx8p3target",
      "source": "q1jrnp3sg724un08lxp89wvj",
      "target": "mlfun7t32xccm2xm8rutx8p3",
      "sourceHandle": "source",
      "targetHandle": "target"
    },
    {
      "id": "xy-edge__qacsk8l118terdzph50ixo2fsource-mlfun7t32xccm2xm8rutx8p3target",
      "source": "qacsk8l118terdzph50ixo2f",
      "target": "mlfun7t32xccm2xm8rutx8p3",
      "sourceHandle": "source",
      "targetHandle": "target"
    },
    {
      "id": "xy-edge__mlfun7t32xccm2xm8rutx8p3source-xz8drwxa206sblg1dnbhfg92target",
      "source": "mlfun7t32xccm2xm8rutx8p3",
      "target": "xz8drwxa206sblg1dnbhfg92",
      "sourceHandle": "source",
      "targetHandle": "target"
    },
    {
      "id": "xy-edge__mlfun7t32xccm2xm8rutx8p3source-cyg3cbc4pf2bw7g6f4bzjdqdtarget",
      "source": "mlfun7t32xccm2xm8rutx8p3",
      "target": "cyg3cbc4pf2bw7g6f4bzjdqd",
      "sourceHandle": "source",
      "targetHandle": "target"
    },
    {
      "id": "xy-edge__xz8drwxa206sblg1dnbhfg92source-ryy2cqgueyq9s49lif8h3pz6target",
      "source": "xz8drwxa206sblg1dnbhfg92",
      "target": "ryy2cqgueyq9s49lif8h3pz6",
      "sourceHandle": "source",
      "targetHandle": "target"
    },
    {
      "id": "xy-edge__cyg3cbc4pf2bw7g6f4bzjdqdsource-ryy2cqgueyq9s49lif8h3pz6target",
      "source": "cyg3cbc4pf2bw7g6f4bzjdqd",
      "target": "ryy2cqgueyq9s49lif8h3pz6",
      "sourceHandle": "source",
      "targetHandle": "target"
    },
    {
      "id": "xy-edge__ryy2cqgueyq9s49lif8h3pz6source-w68nkn9rcu7qebgjcp52bw85target",
      "source": "ryy2cqgueyq9s49lif8h3pz6",
      "target": "w68nkn9rcu7qebgjcp52bw85",
      "sourceHandle": "source",
      "targetHandle": "target"
    }
  ],
  "nodes": [
    {
      "id": "q1jrnp3sg724un08lxp89wvj",
      "data": {
        "label": "manual trigger",
        "node_name": "mg"
      },
      "type": "MANUAL_TRIGGER",
      "position": {
        "x": 38.43277618789823,
        "y": 257.50666569338375
      },
      "node_name": "mg"
    },
    {
      "id": "qacsk8l118terdzph50ixo2f",
      "data": {
        "label": "webhook trigger",
        "node_name": "webhook"
      },
      "type": "WEBHOOK",
      "position": {
        "x": 38.12574693847438,
        "y": 99.4215923792172
      },
      "node_name": "webhook"
    },
    {
      "id": "mlfun7t32xccm2xm8rutx8p3",
      "data": {
        "url": "https://ui.shadcn.com/docs/forms/react-hook-form",
        "label": "http request",
        "method": "PUT",
        "node_name": "get_user_info"
      },
      "type": "HTTP_REQUEST",
      "position": {
        "x": 201.8043427213746,
        "y": 172.5695320890464
      },
      "node_name": "get_user_info"
    },
    {
      "id": "xz8drwxa206sblg1dnbhfg92",
      "data": {
        "label": "send discord message"
      },
      "type": "SEND_DISCORD_MESSAGE",
      "position": {
        "x": 323.48531920193614,
        "y": 94.41396193683238
      },
      "node_name": "untitled_node"
    },
    {
      "id": "cyg3cbc4pf2bw7g6f4bzjdqd",
      "data": {
        "label": "telegram bot message"
      },
      "type": "TELEGRAM_BOT",
      "position": {
        "x": 332.65447346972076,
        "y": 248.2693029656751
      },
      "node_name": "untitled_node"
    },
    {
      "id": "ryy2cqgueyq9s49lif8h3pz6",
      "data": {
        "label": "http request"
      },
      "type": "HTTP_REQUEST",
      "position": {
        "x": 439.5112297888959,
        "y": 171.66945043595217
      },
      "node_name": "untitled_node"
    },
    {
      "id": "w68nkn9rcu7qebgjcp52bw85",
      "data": {
        "label": "send discord message"
      },
      "type": "SEND_DISCORD_MESSAGE",
      "position": {
        "x": 550.5785989990699,
        "y": 171.03044733187957
      },
      "node_name": "untitled_node"
    }
  ],
  "view_port": {
    "x": 228.28461525224088,
    "y": -122.43743721854571,
    "zoom": 2
  }
}
async function executeWorkflow(data, triggerType) {
    const nodeMap = new Map(data.nodes.map(n => [n.id, n]));

    const start = data.nodes.find(n => n.type === triggerType);

    if (!start) {
        throw new Error("Trigger not found");
    }

    // -----------------------------
    // Find reachable nodes
    // -----------------------------

    const reachable = new Set();
    const stack = [start.id];

    while (stack.length) {
        const id = stack.pop();

        if (reachable.has(id)) continue;

        reachable.add(id);

        for (const edge of data.edges) {
            if (edge.source === id) {
                stack.push(edge.target);
            }
        }
    }

    // -----------------------------
    // Build adjacency graph
    // -----------------------------

    const outgoing = new Map();
    const incoming = new Map();

    for (const id of reachable) {
        outgoing.set(id, []);
        incoming.set(id, 0);
    }

    for (const edge of data.edges) {
        if (!reachable.has(edge.source) || !reachable.has(edge.target))
            continue;

        outgoing.get(edge.source).push(edge.target);

        incoming.set(
            edge.target,
            incoming.get(edge.target) + 1
        );
    }

    // -----------------------------
    // Execute
    // -----------------------------

    const executed = new Set();

    async function run(nodeId) {
        if (executed.has(nodeId)) return;

        const node = nodeMap.get(nodeId);

        executed.add(nodeId);

        console.log("Executing:", node.type);

        // Your node execution goes here
        await new Promise(r => setTimeout(r, 1000));

        const promises = [];

        for (const child of outgoing.get(nodeId)) {

            incoming.set(
                child,
                incoming.get(child) - 1
            );

            if (incoming.get(child) === 0) {
                promises.push(run(child));
            }
        }

        await Promise.all(promises);
    }

    await run(start.id);

    // -----------------------------
    // Cycle detection
    // -----------------------------

    if (executed.size !== reachable.size) {
        const stuck = [...reachable].filter(id => !executed.has(id));

        throw new Error(
            `Cycle detected. Nodes involved: ${stuck
                .map(id => nodeMap.get(id).type)
                .join(", ")}`
        );
    }

    console.log("Workflow completed.");
}

executeWorkflow(data, "WEBHOOK");