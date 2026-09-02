import React, { useState } from 'react';
import { AbuseRingCluster, AbuseRingNode } from '../types';
import { 
  Network, 
  ShieldAlert, 
  ShieldCheck, 
  AlertOctagon, 
  Lock, 
  Smartphone, 
  Globe, 
  CreditCard, 
  Mail, 
  Store, 
  Flame, 
  CheckCircle, 
  Sparkles, 
  Layers,
  CheckSquare,
  Square,
  MinusSquare
} from 'lucide-react';

interface AbuseRingSentinelProps {
  rings: AbuseRingCluster[];
  onQuarantineRing: (ringIdOrIds: string | string[]) => void;
}

export const AbuseRingSentinel: React.FC<AbuseRingSentinelProps> = ({
  rings,
  onQuarantineRing
}) => {
  const [selectedRing, setSelectedRing] = useState<AbuseRingCluster>(rings[0]);
  const [selectedNode, setSelectedNode] = useState<AbuseRingNode | null>(null);
  const [selectedRingIds, setSelectedRingIds] = useState<string[]>([]);
  const [isQuarantiningBulk, setIsQuarantiningBulk] = useState(false);

  // Active threat rings eligible for quarantine
  const activeThreatRings = rings.filter((r) => r.status === 'ACTIVE_THREAT');
  const allActiveSelected = activeThreatRings.length > 0 && activeThreatRings.every((r) => selectedRingIds.includes(r.id));
  const someActiveSelected = activeThreatRings.some((r) => selectedRingIds.includes(r.id)) && !allActiveSelected;

  const handleToggleSelectAll = () => {
    if (allActiveSelected) {
      setSelectedRingIds([]);
    } else {
      setSelectedRingIds(activeThreatRings.map((r) => r.id));
    }
  };

  const handleToggleRingSelect = (ringId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRingIds((prev) =>
      prev.includes(ringId) ? prev.filter((id) => id !== ringId) : [...prev, ringId]
    );
  };

  const handleBulkQuarantine = () => {
    const activeSelected = selectedRingIds.filter((id) =>
      rings.some((r) => r.id === id && r.status === 'ACTIVE_THREAT')
    );
    if (activeSelected.length === 0) return;

    setIsQuarantiningBulk(true);
    setTimeout(() => {
      onQuarantineRing(activeSelected);
      setSelectedRingIds([]);
      setIsQuarantiningBulk(false);
    }, 400);
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getNodeIcon = (type: AbuseRingNode['type']) => {
    switch (type) {
      case 'IP':
        return <Globe className="w-4 h-4 text-indigo-600" />;
      case 'DEVICE':
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      case 'CARD_BIN':
        return <CreditCard className="w-4 h-4 text-amber-600" />;
      case 'VPA_HANDLE':
        return <Sparkles className="w-4 h-4 text-pink-600" />;
      case 'EMAIL':
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'MERCHANT':
        return <Store className="w-4 h-4 text-emerald-600" />;
    }
  };

  // Selected threat exposure calculation
  const selectedExposureINR = rings
    .filter((r) => selectedRingIds.includes(r.id))
    .reduce((acc, r) => acc + r.total_volume_inr, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Abuse Ring Sentinel */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Network className="w-4 h-4" />
              <span>Multi-Entity Graph Sentinel</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Syndicate & Carding Botnet Clustering
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
              Graph intelligence detecting coordinated attacks across multiple merchant gateways sharing common proxy subnets, card BINs, and device fingerprints.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Ring Exposure</div>
              <div className="text-xl font-light text-rose-700 font-mono">
                {formatINR(rings.reduce((acc, r) => acc + r.total_volume_inr, 0))}
              </div>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Neutralized Nodes</div>
              <div className="text-xl font-light text-emerald-700 font-mono">
                {rings.filter((r) => r.status === 'QUARANTINED').reduce((acc, r) => acc + r.nodes.length, 0) + 12} Nodes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Interface: Ring Selector & Graph Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Ring Clusters List with Select All & Bulk Actions */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Header toolbar with Select All and Bulk Quarantine */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleSelectAll}
                  disabled={activeThreatRings.length === 0}
                  className="flex items-center space-x-2 text-xs font-bold text-slate-900 hover:text-indigo-600 transition disabled:opacity-50"
                  title="Select / Deselect all active threat syndicates"
                >
                  {allActiveSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                  ) : someActiveSelected ? (
                    <MinusSquare className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                  <span>Select All</span>
                </button>
                <span className="text-[11px] font-mono text-slate-500">
                  ({selectedRingIds.length}/{activeThreatRings.length} Active)
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400 font-bold">{rings.length} Clusters</span>
            </div>

            {/* Bulk Quarantine Action Button Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="text-[11px] font-mono text-slate-500 truncate">
                {selectedRingIds.length > 0 ? (
                  <span className="text-rose-700 font-bold">
                    {selectedRingIds.length} selected ({formatINR(selectedExposureINR)})
                  </span>
                ) : (
                  <span>No syndicates selected</span>
                )}
              </div>

              <button
                onClick={handleBulkQuarantine}
                disabled={selectedRingIds.length === 0 || isQuarantiningBulk}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:hover:bg-rose-600 text-white rounded text-xs font-bold font-mono uppercase tracking-wider transition shadow-sm flex items-center space-x-1.5"
                title="Quarantine all selected fraud syndicates simultaneously"
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>{isQuarantiningBulk ? 'Quarantining...' : `Bulk Quarantine (${selectedRingIds.length})`}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {rings.map((ring) => {
              const isSelected = selectedRing.id === ring.id;
              const isChecked = selectedRingIds.includes(ring.id);
              const isActiveThreat = ring.status === 'ACTIVE_THREAT';

              return (
                <div
                  key={ring.id}
                  onClick={() => {
                    setSelectedRing(ring);
                    setSelectedNode(null);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-50 border-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2.5">
                      {/* Individual Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleRingSelect(ring.id, e)}
                        disabled={!isActiveThreat}
                        className="mt-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title={isActiveThreat ? (isChecked ? 'Deselect syndicate' : 'Select syndicate for bulk quarantine') : 'Already quarantined'}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-slate-900">{ring.id}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            ring.status === 'ACTIVE_THREAT'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {ring.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1">{ring.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{ring.pattern_type}</div>
                      </div>
                    </div>

                    <div className="text-right whitespace-nowrap">
                      <div className="text-xs font-mono font-bold text-rose-700">
                        {formatINR(ring.total_volume_inr)}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {ring.nodes.length} Nodes
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                    <span>Target: {ring.target_merchants.join(', ')}</span>
                    <span className="text-indigo-600 font-bold">{(ring.risk_score * 100).toFixed(0)}% Risk</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Interactive Graph Explorer & Quarantine Controls */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            
            {/* Cluster Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold text-slate-900">{selectedRing.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-mono font-bold">
                    {selectedRing.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Velocity Signature: <span className="text-slate-800 font-mono font-medium">{selectedRing.velocity_spikes}</span>
                </p>
              </div>

              {selectedRing.status === 'ACTIVE_THREAT' ? (
                <button
                  onClick={() => onQuarantineRing(selectedRing.id)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold transition shadow-sm flex items-center space-x-2 font-mono uppercase"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>Quarantine Syndicate</span>
                </button>
              ) : (
                <div className="px-3.5 py-1.5 bg-emerald-100 rounded text-emerald-800 text-xs font-mono font-bold flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>SYNDICATE ISOLATED</span>
                </div>
              )}
            </div>

            {/* Interactive Graph Node Representation */}
            <div className="my-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Entity Graph Topology & Correlation Links</span>
                <span className="text-[11px] text-slate-400 font-mono">Click any entity node to inspect telemetry</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[260px] flex flex-col justify-center relative overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedRing.nodes.map((node) => {
                    const isNodeSelected = selectedNode?.id === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-lg border transition cursor-pointer flex flex-col justify-between ${
                          isNodeSelected
                            ? 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center space-x-1.5">
                            {getNodeIcon(node.type)}
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{node.type}</span>
                          </div>
                          {node.is_compromised && (
                            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                          )}
                        </div>

                        <div className="text-xs font-mono text-slate-900 truncate font-bold">
                          {node.label}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
                          <span>{node.transaction_count} attacks</span>
                          <span className="text-rose-700 font-bold">{Math.round(node.risk_score * 100)}% Risk</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Node Details Drawer */}
            {selectedNode && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getNodeIcon(selectedNode.type)}
                    <span className="text-xs font-bold text-slate-900">{selectedNode.label}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold">
                    Risk Index: {Math.round(selectedNode.risk_score * 100)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Entity Type:</span>
                    <span className="text-slate-900 font-medium">{selectedNode.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Syndicate Cluster:</span>
                    <span className="text-slate-900 font-medium">{selectedNode.cluster_id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Gateway Probes:</span>
                    <span className="text-slate-900 font-medium">{selectedNode.transaction_count} attempts</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Recommended Action:</span>
                    <span className="text-rose-700 font-bold">Enforce Hard Gateway Block</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Target Merchants: {selectedRing.target_merchants.join(' • ')}</span>
            <span>Automated cross-merchant velocity shield</span>
          </div>

        </div>

      </div>

    </div>
  );
};
