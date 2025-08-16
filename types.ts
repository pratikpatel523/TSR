// This file defines the data structures for the parsed log files.

export interface AuditLogEntry {
  index: number;
  date: string;
  host: string;
  access: number;
  type: string;
  address: string;
  category: string;
  result: 'Success' | 'Fail';
  user: string;
  message: string;
}

export interface SystemLogEntry {
  index: number;
  date: string;
  host: string;
  severity: string;
  message: string;
}

export interface DeviceInfo {
    version: string[];
    license: {
        feature: string;
        permit: string;
        expiration: string;
        activationCode: string;
        details: string;
    }[];
    mfgInfo: string[];
}

export interface HealthInfo {
    memory: { metric: string; value: string; }[];
    salRestarts: string[];
    portLinks: string[];
    temperature: { thermometer: string; health: string; warning: string; critical: string; }[];
    powerSupply: { name: string; status: string; health: string; }[];
    voltages: { rail: string; voltage: string; health: string; }[];
    partitions: {
        partition: string;
        percentUsed: string;
        currentUse: string;
        totalCapacity: string;
        health: string;
        warning: string;
        critical: string;
    }[];
    fanHealth: {
        location: string;
        currentRpm: string;
        health: string;
        warningRpm: string;
        criticalRpm: string;
    }[];
}

export interface ActionSet {
    name: string;
    action: string;
    tcpReset: string;
    packetTrace: string;
    priority: string;
    verbosity: string;
    contacts: string;
    quarantine: string;
    httpBlock: string;
    nonHttpBlock: string;
}

export interface EthernetInterface {
    iface: string;
    description: string;
    state: string;
}

export interface Profile {
    name: string;
    description: string;
    deployment: string;
    overview: { category: string; state: string; actionSet: string; }[];
    details: { name: string; actionSet: string; state: string; afc: string; exceptions: string; }[];
}

export interface Segment {
    name: string;
    description: string;
    position: number;
    profile: string;
    reputationProfile: string;
    inPort: string;
    outPort: string;
}

export interface Service {
    port: string;
    protocol: string;
    serviceName: string;
}

export interface TrafficManagementRule {
    profileName: string;
    filterName: string;
    position: number;
    state: string;
    action: string;
    match: string;
    protocol: string;
}

export interface SecurityEvent {
    index: number;
    timestamp: string;
    host: string;
    version: string;
    policyUuid: string;
    severity: string;
    signatureUuid: string;
    protocol: string;
    sourceIp: string;
    sourcePort: number;
    destinationIp: string;
    destinationPort: number;
    hitCount: number;
    vlan: number;
    period: number;
    messageParams: string;
    traceVer: string;
    bucketId: number;
    seqBegin: number;
    seqEnd: number;
    qaction: string;
    actionType: string;
    actionSetUuid: string;
    rateLimitRate: number;
    inIface: string;
    outIface: string;
    virtualSegment: string;
    clientIp: string;
    uriMetaData: string;
}

export interface NetworkInterface {
    iface: string;
    ipAddress: string;
    ipv6Address: string;
    macAddress: string;
    enabled: string;
    link: string;
    speed: string;
    duplex: string;
    mtu: number;
    autoNegotiate: string;
    lineType: string;
}

export interface ConvisEntry {
    time: string;
    ipType: string;
    sourceIp: string;
    sourcePort: number;
    destinationIp: string;
    destinationPort: number;
    protocol: string;
    extra1: number;
    extra2: number;
    extra3: number;
    totalDrop: number;
}

export type StatTable = {
  title?: string;
  headers: string[];
  rows: (string | number)[][];
};

export interface StatisticsData {
  engineFilter: StatTable;
  enginePacket: StatTable;
  engineParse: StatTable;
  engineReputationIp: string[];
  engineReputationDns: string[];
  engineRule: string[];
  genStats: string[];
  protocolMix: {
    ethType: StatTable;
    ipVersion: StatTable;
    ipProtocol: StatTable;
    ipv6Protocol: StatTable;
  };
  reassemblyIp: string[];
  reassemblyTcp: string[];
  regex: StatTable;
  ruleStats: StatTable;
  statShowAll: StatTable[];
  softlinx: string[];
  tierStats: {
    tier1: StatTable;
    tier2: StatTable;
    tier3: StatTable;
    tier4: StatTable;
  };
}

export interface ParsedLogs {
  audit: AuditLogEntry[];
  system: SystemLogEntry[];
  general: {
    deviceInfo: DeviceInfo;
    health: HealthInfo;
  };
  configuration: {
      actionSets: ActionSet[];
      ethernet: EthernetInterface[];
      misc: { [key: string]: string[] };
      profiles: Profile[];
      reputationProfiles: Profile[];
      segments: { physical: Segment[]; virtual: Segment[] };
      services: Service[];
      trafficManagement: TrafficManagementRule[];
  };
  statistics: StatisticsData;
  securityEvents: {
      ipsAlert: SecurityEvent[];
      ipsBlock: SecurityEvent[];
      reputationAlert: SecurityEvent[];
      reputationBlock: SecurityEvent[];
  };
  network: {
      interfaces: NetworkInterface[];
      ipRoute: string[];
  };
  memory: {
      meminfo: string[];
      memoryAll: string[];
      slabinfo: string[];
  };
  rrdGraphs: { [key: string]: any[] }; // Placeholder for graph data
  convis: ConvisEntry[];
  rawLogs: { [key: string]: string };
}