import { EcosystemNodes } from "./ecosystem-nodes";
import { Validators } from "./validators";

export function EcosystemStatus() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-16 md:mb-24 mb-20">
      <div className="lg:col-span-1 col-span-1">
        <Validators />
      </div>
      <div className="lg:col-span-1 col-span-1">
        <EcosystemNodes />
      </div>
    </div>
  );
}
