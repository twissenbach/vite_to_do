import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Stack
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon, Today as TodayIcon, Upcoming as UpcomingIcon, RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { logout } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    date: new Date(),
    time: null,
    isAllDay: true,
    completed: false
  });
  const [activeView, setActiveView] = useState('today');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask({
        title: '',
        date: new Date(),
        time: null,
        isAllDay: true,
        completed: false
      });
      setOpenAddTask(false);
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eaeaea' }}>
        <Toolbar sx={{ py: 1 }}>
          <Typography 
            variant="h6" 
            component={Link}
            to="/dashboard"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#db4c3f',
              textDecoration: 'none'
            }}
          >
            ToDoList
          </Typography>
          <Button 
            onClick={handleLogout}
            sx={{ 
              textTransform: 'none',
              fontSize: '0.95rem',
              color: '#666',
              '&:hover': {
                color: '#333',
                background: 'transparent'
              }
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Paper 
          elevation={3}
          sx={{ 
            maxWidth: '1200px', 
            width: '100%',
            minHeight: 'calc(100vh - 120px)',
            borderRadius: 2,
            bgcolor: '#fafafa'
          }}
        >
          <Grid container>
            {/* Left Sidebar */}
            <Grid item xs={3} sx={{ borderRight: '1px solid #eaeaea', p: 2 }}>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setOpenAddTask(true)}
                sx={{
                  color: '#db4c3f',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  mb: 3,
                  '&:hover': {
                    background: 'rgba(219, 76, 63, 0.1)'
                  }
                }}
              >
                Add task
              </Button>

              <Stack spacing={1}>
                <Button
                  startIcon={<TodayIcon />}
                  onClick={() => setActiveView('today')}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: activeView === 'today' ? '#db4c3f' : '#666',
                    backgroundColor: activeView === 'today' ? 'rgba(219, 76, 63, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(219, 76, 63, 0.1)'
                    }
                  }}
                >
                  Today
                </Button>
                <Button
                  startIcon={<UpcomingIcon />}
                  onClick={() => setActiveView('upcoming')}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: activeView === 'upcoming' ? '#db4c3f' : '#666',
                    backgroundColor: activeView === 'upcoming' ? 'rgba(219, 76, 63, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(219, 76, 63, 0.1)'
                    }
                  }}
                >
                  Upcoming
                </Button>
              </Stack>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={9} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
                {activeView === 'today' ? 'Today' : 'Upcoming'}
              </Typography>
              
              {tasks.length === 0 ? (
                <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                  No tasks yet. Click "Add task" to get started!
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {tasks.map((task, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid #eaeaea',
                        borderRadius: 1,
                        backgroundColor: task.completed ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                        '&:hover': {
                          backgroundColor: task.completed ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 0, 0.01)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                          checked={task.completed}
                          onChange={() => handleToggleComplete(index)}
                          icon={<RadioButtonUnchecked />}
                          checkedIcon={<CheckCircle />}
                          sx={{
                            color: '#808080',
                            '&.Mui-checked': {
                              color: '#808080',
                            },
                            mr: 1
                          }}
                        />
                        <Box>
                          <Typography 
                            sx={{ 
                              textDecoration: task.completed ? 'line-through' : 'none',
                              color: task.completed ? 'text.secondary' : 'text.primary'
                            }}
                          >
                            {task.title}
                          </Typography>
                          {!task.isAllDay && task.time && (
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                textDecoration: task.completed ? 'line-through' : 'none'
                              }}
                            >
                              {task.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Add Task Dialog */}
      <Dialog open={openAddTask} onClose={() => setOpenAddTask(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="Task name"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              sx={{ mb: 3 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker
                  label="Date"
                  value={newTask.date}
                  onChange={(newDate) => setNewTask({ ...newTask, date: newDate })}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newTask.isAllDay}
                      onChange={(e) => setNewTask({ ...newTask, isAllDay: e.target.checked })}
                    />
                  }
                  label="All day"
                />
                {!newTask.isAllDay && (
                  <TimePicker
                    label="Time"
                    value={newTask.time}
                    onChange={(newTime) => setNewTask({ ...newTask, time: newTime })}
                  />
                )}
              </Stack>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTask(false)}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained" sx={{ bgcolor: '#db4c3f', '&:hover': { bgcolor: '#e27065' } }}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
