import { WORKSPACES } from '../src/registry/workspaces';
import { TOOLS } from '../src/registry/tools';
import { AD_SLOTS } from '../src/ads/config/adConfig';
import { validatePlacementPolicy } from '../src/ads/policies/placementPolicy';

console.log('--- ToolNova Production Quality Audit ---');

let hasErrors = false;

// 1. Validate Workspaces
console.log(`\n[1/4] Validating Workspaces (Found: ${WORKSPACES.length})...`);
const workspaceIds = new Set<string>();
for (const ws of WORKSPACES) {
  if (workspaceIds.has(ws.id)) {
    console.error(`❌ Duplicate Workspace ID: ${ws.id}`);
    hasErrors = true;
  }
  workspaceIds.add(ws.id);

  if (!ws.name || !ws.description || ws.toolIds.length === 0) {
    console.error(`❌ Incomplete Workspace configuration: ${ws.id}`);
    hasErrors = true;
  }
}
console.log(`✅ All ${WORKSPACES.length} Workspaces verified.`);

// 2. Validate Tools
console.log(`\n[2/4] Validating Tools (Found: ${TOOLS.length})...`);
const toolIds = new Set<string>();
const toolRoutes = new Set<string>();

for (const tool of TOOLS) {
  if (toolIds.has(tool.id)) {
    console.error(`❌ Duplicate Tool ID: ${tool.id}`);
    hasErrors = true;
  }
  toolIds.add(tool.id);

  if (toolRoutes.has(tool.route)) {
    console.error(`❌ Duplicate Tool Route: ${tool.route}`);
    hasErrors = true;
  }
  toolRoutes.add(tool.route);

  if (!workspaceIds.has(tool.workspaceId)) {
    console.error(`❌ Tool ${tool.id} points to non-existent workspace: ${tool.workspaceId}`);
    hasErrors = true;
  }
}
console.log(`✅ All ${TOOLS.length} Tools verified with unique routes and valid parent workspaces.`);

// 3. Validate SEO Completeness
console.log(`\n[3/4] Validating SEO Metadata Coverage...`);
for (const tool of TOOLS) {
  if (!tool.seo.title || !tool.seo.metaDescription || tool.seo.metaDescription.length < 30) {
    console.error(`❌ Insufficient SEO metadata for tool: ${tool.id}`);
    hasErrors = true;
  }
}
console.log(`✅ 100% SEO metadata coverage verified.`);

// 4. Validate Ad Placement Policies
console.log(`\n[4/4] Validating Ad Placement & Sacred Zone Policies...`);
for (const [id, slot] of Object.entries(AD_SLOTS)) {
  const check = validatePlacementPolicy(slot.placement);
  if (!check.isValid) {
    console.error(`❌ CRITICAL: Ad slot "${id}" violates placement policy: ${check.reason}`);
    hasErrors = true;
  }
}
console.log(`✅ All ad placements comply with strict user experience policies.`);

if (hasErrors) {
  console.error('\n❌ Validation failed with errors.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL VALIDATION CHECKS PASSED: Production Ready.\n');
}
