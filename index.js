import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
    name: "codeRun",
    version: "0.1.0"
});

// Add an addition tool
server.tool("execute",
    { folder: z.string(), cmd: z.string() },
    async ({ folder, cmd }) => {
        const result = await exec(cmd, { cwd: folder });
        return {
            content: [{ type: "text", text: result.stdout }]
        }
    }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
