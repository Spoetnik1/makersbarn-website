/**
 * Structured logging utility with log levels and context support
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
}

type LogContext = Record<string, unknown>

interface LogEntry {
  timestamp: string
  level: LogLevel
  service: string
  message: string
  context?: LogContext
  error?: {
    name: string
    message: string
    stack?: string
  }
}

function getMinLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL?.toUpperCase() as LogLevel | undefined
  if (envLevel && Object.values(LogLevel).includes(envLevel)) {
    return envLevel
  }
  return process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG
}

function shouldLog(level: LogLevel): boolean {
  const minLevel = getMinLogLevel()
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[minLevel]
}

function formatError(error: unknown): LogEntry['error'] | undefined {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }
  if (error !== undefined && error !== null) {
    let message: string
    if (typeof error === 'string') {
      message = error
    } else if (typeof error === 'number' || typeof error === 'boolean') {
      message = String(error)
    } else {
      message = JSON.stringify(error)
    }
    return {
      name: 'Unknown',
      message,
    }
  }
  return undefined
}

interface CreateLogEntryParams {
  level: LogLevel
  service: string
  message: string
  context?: LogContext
  error?: unknown
}

function createLogEntry({ level, service, message, context, error }: CreateLogEntryParams): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    service,
    message,
  }

  if (context && Object.keys(context).length > 0) {
    entry.context = context
  }

  const formattedError = formatError(error)
  if (formattedError) {
    entry.error = formattedError
  }

  return entry
}

function log(entry: LogEntry): void {
  const output = JSON.stringify(entry)

  switch (entry.level) {
    case LogLevel.ERROR:
      console.error(output)
      break
    case LogLevel.WARN:
      console.warn(output)
      break
    case LogLevel.INFO:
      console.info(output)
      break
    case LogLevel.DEBUG:
    default:
      console.info(output)
      break
  }
}

export function createLogger(service: string) {
  return {
    debug: (message: string, context?: LogContext) => {
      if (shouldLog(LogLevel.DEBUG)) {
        log(createLogEntry({ level: LogLevel.DEBUG, service, message, context }))
      }
    },

    info: (message: string, context?: LogContext) => {
      if (shouldLog(LogLevel.INFO)) {
        log(createLogEntry({ level: LogLevel.INFO, service, message, context }))
      }
    },

    warn: (message: string, context?: LogContext, error?: unknown) => {
      if (shouldLog(LogLevel.WARN)) {
        log(createLogEntry({ level: LogLevel.WARN, service, message, context, error }))
      }
    },

    error: (message: string, context?: LogContext, error?: unknown) => {
      if (shouldLog(LogLevel.ERROR)) {
        log(createLogEntry({ level: LogLevel.ERROR, service, message, context, error }))
      }
    },
  }
}

export type Logger = ReturnType<typeof createLogger>
