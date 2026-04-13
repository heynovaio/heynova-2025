import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";
import { createClient } from "@/prismicio";

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  // Fetch prices data for the simulator
  const client = createClient();
  const prices = await client.getSingle("prices").catch(() => null);

  return (
    <SliceSimulator>
      <SliceZone
        slices={slices}
        components={components}
        context={{ pricesDocumentData: prices?.data }}
      />
    </SliceSimulator>
  );
}
