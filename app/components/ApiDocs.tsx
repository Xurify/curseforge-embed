interface ApiEndpoint {
  name: string;
  description: string;
  endpoint: string;
  method: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response: {
    type: string;
    example: string;
    description?: string;
  };
}

const apiEndpoints: ApiEndpoint[] = [
  {
    name: "Project Data API",
    description: "Get detailed information about a CurseForge project.",
    endpoint: "/api/curseforge/{projectId}",
    method: "GET",
    parameters: [
      {
        name: "projectId",
        type: "string",
        required: true,
        description: "The CurseForge project ID.",
      },
    ],
    response: {
      type: "object",
      example: `{
  "id": number,
  "title": string,
  "summary": string,
  "description": string,
  "game": string,
  "type": string,
  "urls": {
    "project": string,
    "issues": string,
    "wiki": string,
    "source": string
  },
  "thumbnail": string,
  "created_at": string,
  "downloads": {
    "total": number
  },
  "license": string,
  "categories": string[],
  "members": Array<{
    "username": string,
    "title": string
  }>,
  "download": {
    "url": string,
    "name": string,
    "version": string
  }
}`,
    },
  },
  {
    name: "Badge API",
    description: "Generate a beautiful badge image for a CurseForge project.",
    endpoint: "/{projectId}.png",
    method: "GET",
    parameters: [
      {
        name: "projectId",
        type: "string",
        required: true,
        description: "The CurseForge project ID.",
      },
      {
        name: "theme",
        type: "string",
        required: false,
        description: 'The badge theme. Options: "light" or "dark". Default: "dark"',
      },
    ],
    response: {
      type: "image/png",
      description: "Returns a PNG image with the following information:",
      example: `Project name
Total downloads
Project owner
Project thumbnail (if available)
CurseForge branding`,
    },
  },
];

export default function ApiDocs() {
  return (
    <div className="space-y-12">
      {apiEndpoints.map((endpoint) => (
        <div key={endpoint.name} className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-[#141414]">
              {endpoint.name}
            </h3>
            <p className="text-[#6D7072]">{endpoint.description}</p>
          </div>

          <div className="bg-[#141414] text-white p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{`${endpoint.method} ${endpoint.endpoint}`}</code>
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-[#141414]">Parameters</h4>
            <div className="space-y-4">
              {endpoint.parameters.map((param) => (
                <div
                  key={param.name}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <span className="font-mono bg-[#141414] text-white px-2 py-1 rounded text-sm">
                      {param.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[#141414] bg-gray-100 px-2 py-0.5 rounded">
                        {param.type}
                      </span>
                      {param.required && (
                        <span className="text-xs font-medium text-[#EB622B] bg-red-50 px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6D7072]">{param.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-[#141414]">Response</h4>
            {endpoint.response.description && (
              <p className="text-[#6D7072] mb-4">
                {endpoint.response.description}
              </p>
            )}
            <div className="bg-[#141414] text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{endpoint.response.example}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-[#141414]">Example Usage</h4>
            <div className="bg-[#141414] text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`// Using the ${endpoint.name}
const response = await fetch('https://your-domain.com${endpoint.endpoint}');
${
  endpoint.name === "Project Data API"
    ? "const data = await response.json();"
    : '// Use in an img tag\n<img src={response.url} alt="CurseForge Project" width="250" height="70" />'
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 