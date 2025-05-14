import { NextValidators } from "./next-validators";
import { TopPerforming } from "./top-performing";

export function ValidatorInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8 gap-16 mb-10">
      <div className="lg:col-span-2 col-span-1">
        <TopPerforming />
      </div>
      <div className="lg:col-span-1 col-span-1">
        <NextValidators />
      </div>
    </div>
  );
}
