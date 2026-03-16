import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { fiveQIValues } from "@/utils/flowData/data/fiveQIData";
import { getAnimationParamsFromQoS } from "@/utils/flowData/utils/fiveQIUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { QoSValues } from "@/types/nodeTypes";

interface FiveQINodeButtonProps {
  icon: LucideIcon;
  iconColor: string;
  onSelect: (fiveQIId: string) => void;
}

/** Small inline bar used to visualise a 0-100 percentage. */
const MiniBar: React.FC<{ pct: number; color: string }> = ({ pct, color }) => (
  <div className="w-[40px] h-[4px] bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
  </div>
);

/** A single row in the 5QI selection menu. */
const QoSMenuItem: React.FC<{
  qos: QoSValues;
  onClick: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  accentClass: string;
}> = ({ qos, onClick, onDragStart, accentClass }) => {
  const ap = getAnimationParamsFromQoS(qos);
  const delayMs = parseInt(qos.packetDelay) || 100;
  const pri = parseInt(qos.priority) || 50;
  // Latency: lower delay → higher bar (inverted)
  const latencyPct = Math.max(5, Math.min(100, Math.round(100 - (delayMs / 5))));
  // Throughput hint: lower priority number → higher importance
  const throughputPct = Math.max(10, Math.min(100, Math.round(100 - pri)));

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      className="cursor-grab active:cursor-grabbing px-2 py-1.5 hover:bg-gray-50 rounded-sm text-sm flex flex-col gap-0.5 select-none"
    >
      {/* Top row: 5QI value, service name, category badge */}
      <div className="flex items-center gap-1.5">
        <span className={`font-bold text-sm ${accentClass} min-w-[28px]`}>{qos.value}</span>
        <span className="text-xs truncate flex-1" title={qos.service}>{qos.service}</span>
        <span
          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
          style={{ backgroundColor: ap.primaryColor }}
        >
          {ap.categoryLabel}
        </span>
      </div>

      {/* Bottom row: latency + throughput mini-bars */}
      <div className="flex items-center gap-2 pl-[30px]">
        <span className="text-[9px] text-gray-400 w-[32px]">Delay</span>
        <MiniBar pct={latencyPct} color={ap.primaryColor} />
        <span className="text-[9px] text-gray-400">{qos.packetDelay}</span>
        <span className="text-[9px] text-gray-400 ml-auto w-[18px]">Thr</span>
        <MiniBar pct={throughputPct} color={ap.primaryColor} />
        <span className="text-[9px] text-gray-400">P{qos.priority}</span>
      </div>
    </div>
  );
};

const FiveQINodeButton: React.FC<FiveQINodeButtonProps> = ({
  icon: Icon,
  iconColor,
  onSelect
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const groupedAndFilteredValues = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filteredValues = fiveQIValues.filter(qos =>
      qos.value.toLowerCase().includes(query) ||
      qos.service.toLowerCase().includes(query) ||
      qos.resourceType.toLowerCase().includes(query) ||
      qos.packetDelay.toLowerCase().includes(query)
    );
    return {
      GBR: filteredValues.filter(qos => qos.resourceType === "GBR"),
      NonGBR: filteredValues.filter(qos => qos.resourceType === "Non-GBR")
    };
  }, [searchQuery]);

  const handleClick = (fiveQIId: string) => {
    console.log(`FiveQINodeButton: Selected 5QI ${fiveQIId}`);
    onSelect(fiveQIId);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, fiveQIId: string) => {
    const dragData = `fiveqi:${fiveQIId}`;
    event.dataTransfer.setData('text/plain', dragData);
    event.dataTransfer.effectAllowed = 'copy';
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    event.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  return (
    <div className="flex flex-col items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 mb-1 cursor-pointer"
              >
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-[340px] bg-white p-0">
              {/* Search + legend header */}
              <div className="sticky top-0 bg-white border-b z-10">
                <div className="flex items-center gap-2 px-3 py-1.5">
                  <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <Input
                    placeholder="Search 5QI values, services, delay..."
                    className="h-7 text-xs focus-visible:ring-0 border-none focus-visible:ring-offset-0 pl-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="px-3 pb-1.5 flex items-center gap-3 text-[9px] text-gray-400">
                  <span>Delay bar = low latency</span>
                  <span>Thr bar = throughput priority</span>
                  <span>Drag or click to add</span>
                </div>
              </div>

              <ScrollArea className="h-[360px]">
                {/* GBR Section */}
                {groupedAndFilteredValues.GBR.length > 0 && (
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      GBR — Guaranteed Bit Rate
                      <span className="text-[9px] font-normal text-blue-500 ml-auto">
                        Dedicated bandwidth, bounded latency
                      </span>
                    </DropdownMenuLabel>
                    {groupedAndFilteredValues.GBR.map((qos) => (
                      <QoSMenuItem
                        key={qos.value}
                        qos={qos}
                        onClick={() => handleClick(qos.value)}
                        onDragStart={(e) => handleDragStart(e, qos.value)}
                        accentClass="text-blue-700"
                      />
                    ))}
                  </DropdownMenuGroup>
                )}

                {groupedAndFilteredValues.GBR.length > 0 &&
                 groupedAndFilteredValues.NonGBR.length > 0 &&
                 <DropdownMenuSeparator />}

                {/* Non-GBR Section */}
                {groupedAndFilteredValues.NonGBR.length > 0 && (
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
                      Non-GBR — Best Effort / Priority-Based
                      <span className="text-[9px] font-normal text-purple-500 ml-auto">
                        Shared bandwidth, prioritised
                      </span>
                    </DropdownMenuLabel>
                    {groupedAndFilteredValues.NonGBR.map((qos) => (
                      <QoSMenuItem
                        key={qos.value}
                        qos={qos}
                        onClick={() => handleClick(qos.value)}
                        onDragStart={(e) => handleDragStart(e, qos.value)}
                        accentClass="text-purple-700"
                      />
                    ))}
                  </DropdownMenuGroup>
                )}

                {/* Empty state */}
                {groupedAndFilteredValues.GBR.length === 0 &&
                 groupedAndFilteredValues.NonGBR.length === 0 && (
                  <div className="py-6 text-center text-gray-500 text-sm">
                    No matching 5QI values found
                  </div>
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="right" align="start" className="font-normal max-w-[220px]">
          <p className="font-medium">5QI Node</p>
          <p className="text-xs text-muted-foreground">
            Select a 5G QoS Identifier. The animation will reflect its characteristics — thicker lines for higher throughput, faster pulsing for lower latency.
          </p>
        </TooltipContent>
      </Tooltip>
      <span className="text-[9px] text-center">5QI</span>
    </div>
  );
};

export default FiveQINodeButton;
