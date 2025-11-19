export interface FrameLayoutSlot {
  id: string;
  gridColumn: string;
  gridRow: string;
}

export interface FrameLayoutOption {
  id: string;
  label: string;
  description: string;
  columns: string;
  rows: string;
  gap: string;
  columnWeights: number[];
  rowWeights: number[];
  slots: FrameLayoutSlot[];
}

type SlotDefinition = Omit<FrameLayoutSlot, "id">;

const clampCount = (count: number) => Math.min(9, Math.max(1, count));

const deriveWeights = (template: string): number[] => {
  const repeatMatch = template.match(/repeat\((\d+),/i);
  if (repeatMatch) {
    const count = parseInt(repeatMatch[1], 10);
    return Array.from({ length: count }, () => 1);
  }

  const weights = template
    .split(/\s+/)
    .map((segment) => {
      const value = segment.match(/([\d.]+)fr/i);
      return value ? parseFloat(value[1]) : null;
    })
    .filter((weight): weight is number => Boolean(weight) && weight > 0);

  return weights.length > 0 ? weights : [1];
};

const createLayout = (
  config: Omit<FrameLayoutOption, "columnWeights" | "rowWeights" | "slots"> & {
    columnWeights?: number[];
    rowWeights?: number[];
    slots: SlotDefinition[];
  },
): FrameLayoutOption => ({
  ...config,
  columnWeights: config.columnWeights ?? deriveWeights(config.columns),
  rowWeights: config.rowWeights ?? deriveWeights(config.rows),
  slots: config.slots.map((slot, index) => ({
    id: `${config.id}-slot-${index}`,
    ...slot,
  })),
});

const curatedLayouts: Record<number, FrameLayoutOption[]> = {
  1: [
    createLayout({
      id: "solo-focus",
      label: "Full Canvas",
      description: "Single hero image",
      columns: "1fr",
      rows: "1fr",
      gap: "1rem",
      slots: [{ gridColumn: "1 / 2", gridRow: "1 / 2" }],
    }),
    createLayout({
      id: "solo-letterbox",
      label: "Letterbox Story",
      description: "Wide cinematic panel",
      columns: "3fr 2fr",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1.25rem",
      columnWeights: [3, 2],
      slots: [{ gridColumn: "1 / 3", gridRow: "1 / 3" }],
    }),
  ],
  2: [
    createLayout({
      id: "duo-panorama",
      label: "Panorama Duo",
      description: "Twin columns",
      columns: "repeat(2, minmax(0, 1fr))",
      rows: "1fr",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
      ],
    }),
    createLayout({
      id: "duo-stack",
      label: "Stacked Story",
      description: "Chronologic vertical stack",
      columns: "1fr",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
      ],
    }),
    createLayout({
      id: "duo-feature",
      label: "Feature Pair",
      description: "Hero + supporting visual",
      columns: "2fr 1fr",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      columnWeights: [2, 1],
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 3" },
        { gridColumn: "2 / 3", gridRow: "1 / 3" },
      ],
    }),
  ],
  3: [
    createLayout({
      id: "triple-side",
      label: "Split Gallery",
      description: "Stacked left column",
      columns: "2fr 1fr",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      columnWeights: [2, 1],
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "1 / 3" },
      ],
    }),
    createLayout({
      id: "triple-banner",
      label: "Banner Hero",
      description: "Hero on top, duo below",
      columns: "repeat(2, minmax(0, 1fr))",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
      ],
    }),
    createLayout({
      id: "triple-column",
      label: "Trio Columns",
      description: "Even three-way grid",
      columns: "repeat(3, minmax(0, 1fr))",
      rows: "1fr",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
      ],
    }),
  ],
  4: [
    createLayout({
      id: "quad-grid",
      label: "Quad Grid",
      description: "Classic 2x2 board",
      columns: "repeat(2, minmax(0, 1fr))",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
      ],
    }),
    createLayout({
      id: "quad-spotlight",
      label: "Spotlight Tower",
      description: "Tall column + footer strip",
      columns: "repeat(2, minmax(0, 1fr))",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 3" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "1 / 3", gridRow: "3 / 4" },
      ],
    }),
    createLayout({
      id: "quad-columns",
      label: "Offset Columns",
      description: "Staggered vertical mix",
      columns: "1.2fr 1fr 1fr",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      columnWeights: [1.2, 1, 1],
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 3" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "2 / 4", gridRow: "2 / 3" },
      ],
    }),
  ],
  5: [
    createLayout({
      id: "five-cascade",
      label: "Cascade Tower",
      description: "Tiered gallery",
      columns: "3fr 2fr",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      columnWeights: [3, 2],
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 3" },
        { gridColumn: "1 / 2", gridRow: "3 / 4" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "3 / 4" },
      ],
    }),
    createLayout({
      id: "five-banner",
      label: "Banner Trio",
      description: "Hero plus three-pack",
      columns: "repeat(3, minmax(0, 1fr))",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "3 / 4", gridRow: "2 / 3" },
      ],
    }),
  ],
  6: [
    createLayout({
      id: "six-lattice",
      label: "Honeycomb",
      description: "Staggered six-pack",
      columns: "repeat(3, minmax(0, 1fr))",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 3" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "1 / 2", gridRow: "3 / 4" },
        { gridColumn: "2 / 4", gridRow: "3 / 4" },
      ],
    }),
  ],
  7: [
    createLayout({
      id: "seven-wide",
      label: "Wide Rows",
      description: "Two-row staircase",
      columns: "repeat(4, minmax(0, 1fr))",
      rows: "repeat(2, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "4 / 5", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "3 / 4", gridRow: "2 / 3" },
        { gridColumn: "4 / 5", gridRow: "2 / 3" },
      ],
    }),
    createLayout({
      id: "seven-spiral",
      label: "Spiral Weave",
      description: "Center-focused spiral",
      columns: "repeat(3, minmax(0, 1fr))",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 4" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "3 / 4", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "3 / 4" },
        { gridColumn: "3 / 4", gridRow: "3 / 4" },
      ],
    }),
  ],
  8: [
    createLayout({
      id: "eight-tier",
      label: "Tiered Focus",
      description: "Bold leading row",
      columns: "repeat(3, minmax(0, 1fr))",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "3 / 4", gridRow: "2 / 3" },
        { gridColumn: "1 / 2", gridRow: "3 / 4" },
        { gridColumn: "2 / 3", gridRow: "3 / 4" },
        { gridColumn: "3 / 4", gridRow: "3 / 4" },
      ],
    }),
  ],
  9: [
    createLayout({
      id: "nine-classic",
      label: "Classic Nine",
      description: "Even 3x3 board",
      columns: "repeat(3, minmax(0, 1fr))",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 2", gridRow: "1 / 2" },
        { gridColumn: "2 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 3", gridRow: "2 / 3" },
        { gridColumn: "3 / 4", gridRow: "2 / 3" },
        { gridColumn: "1 / 2", gridRow: "3 / 4" },
        { gridColumn: "2 / 3", gridRow: "3 / 4" },
        { gridColumn: "3 / 4", gridRow: "3 / 4" },
      ],
    }),
    createLayout({
      id: "nine-weave",
      label: "Weave Matrix",
      description: "Mixed-width pattern",
      columns: "repeat(4, minmax(0, 1fr))",
      rows: "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
      slots: [
        { gridColumn: "1 / 3", gridRow: "1 / 2" },
        { gridColumn: "3 / 4", gridRow: "1 / 2" },
        { gridColumn: "4 / 5", gridRow: "1 / 2" },
        { gridColumn: "1 / 2", gridRow: "2 / 3" },
        { gridColumn: "2 / 4", gridRow: "2 / 3" },
        { gridColumn: "4 / 5", gridRow: "2 / 3" },
        { gridColumn: "1 / 2", gridRow: "3 / 4" },
        { gridColumn: "2 / 3", gridRow: "3 / 4" },
        { gridColumn: "3 / 5", gridRow: "3 / 4" },
      ],
    }),
  ],
};

const createBalancedGrid = (count: number): FrameLayoutOption => {
  const normalized = clampCount(count);
  const columns = Math.ceil(Math.sqrt(normalized));
  const rows = Math.ceil(normalized / columns);

  const slots = Array.from({ length: normalized }, (_, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    return {
      id: `grid-${index}`,
      gridColumn: `${col + 1} / ${col + 2}`,
      gridRow: `${row + 1} / ${row + 2}`,
    };
  });

  return createLayout({
    id: `balanced-${normalized}`,
    label: "Balanced Grid",
    description: `${columns} columns`,
    columns: `repeat(${columns}, minmax(0, 1fr))`,
    rows: `repeat(${rows}, minmax(0, 1fr))`,
    gap: "1rem",
    slots,
  });
};

const createColumnStack = (count: number): FrameLayoutOption => {
  const normalized = clampCount(count);
  const slots = Array.from({ length: normalized }, (_, index) => ({
    id: `column-${index}`,
    gridColumn: "1 / 2",
    gridRow: `${index + 1} / ${index + 2}`,
  }));

  return createLayout({
    id: `columns-${normalized}`,
    label: "Vertical Stack",
    description: "Single column",
    columns: "1fr",
    rows: `repeat(${normalized}, minmax(0, 1fr))`,
    gap: "0.75rem",
    slots,
  });
};

const createRowStrip = (count: number): FrameLayoutOption => {
  const normalized = clampCount(count);
  const slots = Array.from({ length: normalized }, (_, index) => ({
    id: `row-${index}`,
    gridColumn: `${index + 1} / ${index + 2}`,
    gridRow: "1 / 2",
  }));

  return createLayout({
    id: `rows-${normalized}`,
    label: "Horizontal Strip",
    description: "Single row",
    columns: `repeat(${normalized}, minmax(0, 1fr))`,
    rows: "1fr",
    gap: "0.75rem",
    slots,
  });
};

const createFeaturedMosaic = (count: number): FrameLayoutOption | null => {
  const normalized = clampCount(count);
  if (normalized < 3 || normalized === 3) return null;

  const heroColumns = normalized >= 4 ? 3 : 2;
  const remaining = normalized - 1;
  const extraRows = Math.ceil(remaining / heroColumns);
  const totalRows = 1 + Math.max(1, extraRows);

  const slots: FrameLayoutSlot[] = [
    {
      id: "hero",
      gridColumn: `1 / ${heroColumns + 1}`,
      gridRow: "1 / 2",
    },
  ];

  for (let i = 0; i < remaining; i += 1) {
    const row = Math.floor(i / heroColumns);
    const col = i % heroColumns;
    slots.push({
      id: `mosaic-${i}`,
      gridColumn: `${col + 1} / ${col + 2}`,
      gridRow: `${row + 2} / ${row + 3}`,
    });
  }

  return createLayout({
    id: `mosaic-${normalized}`,
    label: "Hero Mosaic",
    description: "Featured top row",
    columns: `repeat(${heroColumns}, minmax(0, 1fr))`,
    rows: `repeat(${totalRows}, minmax(0, 1fr))`,
    gap: "1rem",
    slots,
  });
};

export const getFrameLayouts = (count: number): FrameLayoutOption[] => {
  const normalized = clampCount(count);
  const curated = curatedLayouts[normalized] ?? [];

  const generated: FrameLayoutOption[] = [];
  const mosaic = createFeaturedMosaic(normalized);
  if (mosaic) {
    generated.push(mosaic);
  }
  generated.push(createBalancedGrid(normalized), createColumnStack(normalized));

  if (normalized > 1) {
    generated.push(createRowStrip(normalized));
  }

  return [...curated, ...generated];
};
