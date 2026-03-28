import { useState, useEffect } from 'react';
import { History, Search, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const HistoryDashboard = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/history');
      setHistory(response.data);
    } catch (err) {
      setError('Failed to load history. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHistory = history.filter(item => 
    item.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <History className="text-emerald-500 w-8 h-8" />
            Diagnosis History
          </h1>
          <p className="mt-2 text-gray-600">Review your past crop disease predictions and treatments.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search crop or disease..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-center gap-3">
          <AlertCircle className="text-red-500 w-5 h-5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <History className="text-gray-400 w-10 h-10" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No history found</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm ? "No results match your search." : "You haven't uploaded any crop images for diagnosis yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredHistory.map((item) => (
              <li key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {item.cropType}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className={`text-xl font-bold ${item.diseaseName === 'Healthy' ? 'text-emerald-500' : 'text-orange-500'}`}>
                        {item.diseaseName}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Confidence:</span>
                        <div className="w-32 bg-gray-200 rounded-full h-1.5 flex items-center">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.confidenceScore * 100}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-500">{(item.confidenceScore * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">Suggested Treatment</h5>
                    <p className="text-sm text-emerald-900 leading-snug">
                      {item.suggestedTreatment}
                    </p>
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default HistoryDashboard;
