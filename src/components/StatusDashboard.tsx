
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { fetchServiceStatus } from "@/services/uptimeService";

// Dummy data for the status dashboard
const generateData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 1000 * 60 * 30);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cpu: Math.round(20 + Math.random() * 30),
      memory: Math.round(50 + Math.random() * 15),
      requests: Math.round(100 + Math.random() * 400),
    });
  }
  
  return data;
};

const StatusDashboard = () => {
  const [chartData, setChartData] = useState(generateData);
  const [selectedRange, setSelectedRange] = useState('24h');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Fetch service status data
  const fetchStatusData = async () => {
    setLoading(true);
    try {
      const data = await fetchServiceStatus();
      setServices(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch status data:", error);
      toast({
        title: "Error fetching status data",
        description: "Couldn't connect to Upptime service",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load status data on component mount
  useEffect(() => {
    fetchStatusData();
  }, []);
  
  // Simulate real-time data updates for charts
  useEffect(() => {
    const timer = setInterval(() => {
      const newData = [...chartData];
      const lastPoint = newData[newData.length - 1];
      const now = new Date();
      
      newData.shift();
      newData.push({
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cpu: Math.min(Math.max(lastPoint.cpu + (Math.random() * 10 - 5), 15), 60),
        memory: Math.min(Math.max(lastPoint.memory + (Math.random() * 6 - 3), 45), 75),
        requests: Math.min(Math.max(lastPoint.requests + (Math.random() * 100 - 50), 50), 600),
      });
      
      setChartData(newData);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [chartData]);
  
  // Get overall system status
  const systemStatus = services.some(s => s.status === "outage")
    ? "outage"
    : services.some(s => s.status === "degraded") 
      ? "degraded" 
      : "operational";
  
  const getStatusColor = (status) => {
    switch (status) {
      case "operational": return "text-terminal-green";
      case "degraded": return "text-yellow-500";
      case "outage": return "text-red-500";
      default: return "text-terminal-gray";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "operational": 
        return "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/30";
      case "degraded":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case "outage":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default:
        return "bg-terminal-gray/20 text-terminal-gray hover:bg-terminal-gray/30";
    }
  };
  
  return (
    <section id="status" className="section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">System Status Dashboard</h2>
        <p className="text-terminal-gray text-center mb-6">
          Monitor Pancrate's system health and service status in real-time via Upptime
        </p>
        
        <div className="flex justify-center mb-6">
          <Button 
            onClick={fetchStatusData} 
            variant="outline"
            className="flex items-center gap-2 border-terminal-gray/30"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> 
            Refresh Status
          </Button>
          <div className="ml-4 text-sm text-terminal-gray self-center">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        
        {/* System Status */}
        <Card className="bg-terminal-dark border-terminal-gray/20 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-terminal-text">System Status</CardTitle>
            <Badge className={getStatusBadgeClass(systemStatus)}>
              {systemStatus === "operational" ? (
                <><CheckCircle2 className="h-4 w-4 mr-1" /> All Systems Operational</>
              ) : systemStatus === "degraded" ? (
                <><AlertCircle className="h-4 w-4 mr-1" /> Partial System Outage</>
              ) : (
                <><AlertCircle className="h-4 w-4 mr-1" /> Major System Outage</>
              )}
            </Badge>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Load Card */}
          <Card className="bg-terminal-dark border-terminal-gray/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-terminal-text">System Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-terminal-green">32%</div>
              <p className="text-terminal-gray text-sm">
                Average CPU usage across all nodes
              </p>
              <div className="h-2 bg-terminal-bg rounded-full mt-4">
                <div className="h-2 bg-terminal-green rounded-full" style={{ width: '32%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Memory Usage Card */}
          <Card className="bg-terminal-dark border-terminal-gray/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-terminal-text">Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-terminal-purple">58%</div>
              <p className="text-terminal-gray text-sm">
                Current memory allocation
              </p>
              <div className="h-2 bg-terminal-bg rounded-full mt-4">
                <div className="h-2 bg-terminal-purple rounded-full" style={{ width: '58%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Request Rate Card */}
          <Card className="bg-terminal-dark border-terminal-gray/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-terminal-text">Request Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-terminal-blue">352/s</div>
              <p className="text-terminal-gray text-sm">
                Current API requests per second
              </p>
              <div className="h-2 bg-terminal-bg rounded-full mt-4">
                <div className="h-2 bg-terminal-blue rounded-full" style={{ width: '70%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Performance Charts */}
        <Card className="bg-terminal-dark border-terminal-gray/20 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-terminal-text">Performance Metrics</CardTitle>
            <div className="flex space-x-2">
              {['1h', '6h', '24h', '7d'].map((range) => (
                <Button 
                  key={range}
                  variant={selectedRange === range ? "default" : "outline"}
                  className={selectedRange === range 
                    ? "h-7 text-xs bg-terminal-green text-terminal-dark hover:bg-terminal-green/90" 
                    : "h-7 text-xs border-terminal-gray/30 text-terminal-gray hover:text-terminal-text"
                  }
                  onClick={() => setSelectedRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 100]} 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    domain={[0, 800]}
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C',
                      borderColor: 'rgba(255,255,255,0.2)', 
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="cpu" 
                    name="CPU %" 
                    stroke="#0FE47A" 
                    dot={false} 
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="memory" 
                    name="Memory %" 
                    stroke="#9B87F5" 
                    dot={false}
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="requests" 
                    name="Requests/min" 
                    stroke="#33C3F0" 
                    dot={false}
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Services Status */}
        <Card className="bg-terminal-dark border-terminal-gray/20">
          <CardHeader>
            <CardTitle className="text-terminal-text">Services Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-terminal-green"></div>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-8 text-terminal-gray">
                  No service status data available
                </div>
              ) : (
                services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-terminal-gray/20">
                    <div>
                      <div className="font-medium text-terminal-text">{service.name}</div>
                      <div className="text-terminal-gray text-sm">
                        <span>Uptime: {service.uptime}</span>
                        {service.responseTime && (
                          <span className="ml-3">Response: {service.responseTime}ms</span>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusBadgeClass(service.status)}>
                      {service.status === "operational" ? "Operational" : 
                       service.status === "degraded" ? "Degraded Performance" : "Outage"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StatusDashboard;
